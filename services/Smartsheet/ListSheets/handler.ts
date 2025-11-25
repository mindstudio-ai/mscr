import { ListSheetsInputs } from './type';
import { IHandlerContext } from '../type';
import fs from 'fs';
import FormData from 'form-data';
import fetch from 'node-fetch';
const BASE_URL = 'https://api.smartsheet.com/2.0';

interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  queryParams?: Record<string, string | number | boolean | undefined>;
  body?: any;
  headers?: Record<string, string>;
  multipart?: boolean;
  filePath?: string;
  fileName?: string;
}

const smartsheetApiRequest = async <T = any>(
  options: ApiRequestOptions,
): Promise<T> => {
  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const url = new URL(`${BASE_URL}${options.path}`);
  if (options.queryParams) {
    Object.entries(options.queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    ...options.headers,
  };

  let body: any = undefined;

  if (options.multipart && options.filePath) {
    const form = new FormData();
    const fileStream = fs.createReadStream(options.filePath);
    const fileName =
      options.fileName || options.filePath.split('/').pop() || 'file';

    form.append('file', fileStream, fileName);

    if (options.body) {
      Object.entries(options.body).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          form.append(key, String(value));
        }
      });
    }

    Object.assign(headers, form.getHeaders());
    body = form;
  } else if (options.body) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(options.body);
  }

  const response = await fetch(url.toString(), {
    method: options.method || 'GET',
    headers,
    body,
  });

  if (!response.ok) {
    let errorMessage = `API request failed with status ${response.status}`;
    try {
      const errorData = (await response.json()) as {
        message?: string;
        errorCode?: number;
      };
      if (errorData.message) {
        errorMessage = errorData.message;
      } else if (errorData.errorCode) {
        errorMessage = `Error ${errorData.errorCode}: ${errorData.message || 'Unknown error'}`;
      }
    } catch {
      const errorText = await response.text();
      if (errorText) {
        errorMessage += ` - ${errorText}`;
      }
    }
    throw new Error(errorMessage);
  }

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const data = (await response.json()) as { result?: T } & T;
    return data as T;
  }

  return (await response.text()) as T;
};

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<ListSheetsInputs>) => {
  const {
    include,
    includeOwnerInfo,
    includeAll,
    modifiedSince,
    numericDates,
    page,
    pageSize,
    accessApiLevel,
    outputVariable,
  } = inputs;

  log('Retrieving list of sheets from Smartsheet');

  try {
    // Build query parameters
    const queryParams: Record<string, string | number | boolean> = {};

    if (include) {
      queryParams.include = include;
    }

    if (includeAll !== undefined) {
      queryParams.includeAll = includeAll;
    }
    if (includeOwnerInfo !== undefined) {
      queryParams.includeOwnerInfo = includeOwnerInfo;
    }

    if (modifiedSince) {
      queryParams.modifiedSince = modifiedSince;
    }

    if (numericDates !== undefined) {
      queryParams.numericDates = numericDates;
    }

    if (page !== undefined) {
      queryParams.page = page;
    }

    if (pageSize !== undefined) {
      queryParams.pageSize = pageSize;
    }

    if (accessApiLevel !== undefined) {
      queryParams.accessApiLevel = accessApiLevel;
    }

    // Get list of sheets
    const response = await smartsheetApiRequest<{
      data: any[];
      totalCount?: number;
      pageNumber?: number;
      pageSize?: number;
      totalPages?: number;
    }>({
      method: 'GET',
      path: '/sheets',
      queryParams,
    });

    const data = (response as any).data || response;
    const totalCount = (response as any).totalCount || data.length;

    log(
      `Successfully retrieved ${Array.isArray(data) ? data.length : 0} sheets`,
    );

    // Set output variable
    setOutput(outputVariable, {
      totalCount,
      sheets: data,
    });
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error occurred';
    throw new Error(`Failed to list sheets: ${errorMessage}`);
  }
};

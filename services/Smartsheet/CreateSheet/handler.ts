import { CreateSheetInputs } from './type';
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
}: IHandlerContext<CreateSheetInputs>) => {
  const {
    sheetName,
    columns,
    folderId,
    workspaceId,
    include,
    accessApiLevel,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!sheetName) {
    throw new Error('Sheet name is required');
  }

  if (!columns) {
    throw new Error('Columns definition is required');
  }

  log(`Creating new sheet: ${sheetName}`);

  try {
    // Build query parameters
    const queryParams: Record<string, string | number> = {};
    if (include) {
      queryParams.include = include;
    }
    if (accessApiLevel !== undefined) {
      queryParams.accessApiLevel = accessApiLevel;
    }

    // Parse columns
    const columnArray =
      typeof columns === 'string' ? JSON.parse(columns) : columns;

    if (!Array.isArray(columnArray) || columnArray.length === 0) {
      throw new Error('Columns must be a non-empty array');
    }

    // Prepare sheet object
    const sheetSpec: any = {
      name: sheetName,
      columns: columnArray,
    };

    let path: string;

    // Create sheet in appropriate location
    if (workspaceId) {
      log(`Creating sheet in workspace: ${workspaceId}`);
      path = `/workspaces/${workspaceId}/sheets`;
    } else if (folderId) {
      log(`Creating sheet in folder: ${folderId}`);
      path = `/folders/${folderId}/sheets`;
    } else {
      log('Creating sheet in home');
      path = '/sheets';
    }

    const response = await smartsheetApiRequest({
      method: 'POST',
      path,
      queryParams,
      body: sheetSpec,
    });

    log(`Successfully created sheet with ID: ${(response as any).id}`);

    // Set output variable
    setOutput(outputVariable, response);
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error occurred';

    if (errorMessage.includes('400') || errorMessage.includes('Invalid')) {
      throw new Error(
        `Invalid sheet configuration: ${errorMessage}. Check your columns definition.`,
      );
    } else if (
      errorMessage.includes('404') ||
      errorMessage.includes('Not Found')
    ) {
      throw new Error(
        `Location not found (folder or workspace). Please check the ID.`,
      );
    } else if (
      errorMessage.includes('403') ||
      errorMessage.includes('Permission')
    ) {
      throw new Error(
        `Permission denied. You may not have permission to create sheets in this location.`,
      );
    } else {
      throw new Error(`Failed to create sheet: ${errorMessage}`);
    }
  }
};

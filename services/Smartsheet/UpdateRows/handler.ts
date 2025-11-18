import { UpdateRowsInputs } from './type';
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
}: IHandlerContext<UpdateRowsInputs>) => {
  const {
    sheetId,
    rowsData,
    accessApiLevel,
    allowPartialSuccess,
    overrideValidation,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }

  if (!rowsData) {
    throw new Error('Rows data is required');
  }

  log(`Updating rows in sheet: ${sheetId}`);

  try {
    // Build query parameters
    const queryParams: Record<string, number | boolean> = {};
    if (accessApiLevel !== undefined) {
      queryParams.accessApiLevel = accessApiLevel;
    }
    if (allowPartialSuccess !== undefined) {
      queryParams.allowPartialSuccess = allowPartialSuccess;
    }
    if (overrideValidation !== undefined) {
      queryParams.overrideValidation = overrideValidation;
    }

    // Parse rows data
    let rowsArray =
      typeof rowsData === 'string' ? JSON.parse(rowsData) : rowsData;

    if (!Array.isArray(rowsArray)) {
      // If single row object provided, wrap in array
      rowsArray = [rowsArray];
    }

    // Validate that each row has an id
    for (const row of rowsArray) {
      if (!row.id) {
        throw new Error('Each row must have an "id" property');
      }
    }

    log(`Updating ${rowsArray.length} row(s)`);

    // Update rows in sheet
    const response = await smartsheetApiRequest<{ id: number }[]>({
      method: 'PUT',
      path: `/sheets/${sheetId}/rows`,
      queryParams,
      body: rowsArray,
    });

    const resultArray = Array.isArray(response) ? response : [response];
    log(`Successfully updated ${resultArray.length} row(s)`);

    // Set output variable
    setOutput(outputVariable, {
      updatedRows: resultArray,
      count: resultArray.length,
    });
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error occurred';

    if (errorMessage.includes('404') || errorMessage.includes('Not Found')) {
      throw new Error(
        `Sheet or row not found. Please check the sheet ID and row IDs.`,
      );
    } else if (
      errorMessage.includes('403') ||
      errorMessage.includes('Permission')
    ) {
      throw new Error(
        `Permission denied. You must have editor access to update rows in this sheet.`,
      );
    } else if (
      errorMessage.includes('400') ||
      errorMessage.includes('Invalid')
    ) {
      throw new Error(
        `Invalid row data: ${errorMessage}. Check your row IDs, column IDs, and values.`,
      );
    } else {
      throw new Error(`Failed to update rows: ${errorMessage}`);
    }
  }
};

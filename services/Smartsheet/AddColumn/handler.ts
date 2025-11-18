import { AddColumnInputs } from './type';
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
}: IHandlerContext<AddColumnInputs>) => {
  const {
    sheetId,
    columnTitle,
    columnType,
    picklistOptions,
    insertPosition,
    siblingColumnIndex,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }

  if (!columnTitle) {
    throw new Error('Column title is required');
  }

  if (!columnType) {
    throw new Error('Column type is required');
  }

  log(`Adding column "${columnTitle}" to sheet ${sheetId}`);

  try {
    // Build column object
    const columnSpec: any = {
      title: columnTitle,
      type: columnType,
    };

    // Add picklist options if type is PICKLIST
    if (columnType === 'PICKLIST' && picklistOptions) {
      let optionsArray: string[];

      if (typeof picklistOptions === 'string') {
        // Try to parse as JSON first
        try {
          optionsArray = JSON.parse(picklistOptions);
        } catch {
          // If not JSON, split by comma
          optionsArray = picklistOptions
            .split(',')
            .map((opt: string) => opt.trim())
            .filter((opt: string) => opt.length > 0);
        }
      } else if (Array.isArray(picklistOptions)) {
        optionsArray = picklistOptions;
      } else {
        throw new Error(
          'Picklist options must be a comma-separated string or array',
        );
      }

      columnSpec.options = optionsArray;
      log(`Added ${optionsArray.length} picklist options`);
    }

    // Add position if specified
    if (insertPosition && insertPosition !== 'end') {
      if (insertPosition === 'beginning') {
        columnSpec.index = 0;
      } else if (
        (insertPosition === 'before' || insertPosition === 'after') &&
        siblingColumnIndex !== undefined &&
        siblingColumnIndex !== ''
      ) {
        const index = parseInt(siblingColumnIndex, 10);
        if (isNaN(index)) {
          throw new Error('Sibling column index must be a valid number');
        }
        columnSpec.index = insertPosition === 'before' ? index : index + 1;
      }
    }

    // Add column to sheet
    const response = await smartsheetApiRequest({
      method: 'POST',
      path: `/sheets/${sheetId}/columns`,
      body: columnSpec,
    });

    log(`Successfully added column with ID: ${(response as any).id}`);

    // Set output variable
    setOutput(outputVariable, response);
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error occurred';

    if (errorMessage.includes('404') || errorMessage.includes('Not Found')) {
      throw new Error(
        `Sheet not found: ${sheetId}. Please check the ID and your access permissions.`,
      );
    } else if (
      errorMessage.includes('403') ||
      errorMessage.includes('Permission')
    ) {
      throw new Error(
        `Permission denied. You must have editor or admin access to add columns to this sheet.`,
      );
    } else if (
      errorMessage.includes('400') ||
      errorMessage.includes('Invalid')
    ) {
      throw new Error(
        `Invalid column configuration: ${errorMessage}. Check your column type and options.`,
      );
    } else {
      throw new Error(`Failed to add column: ${errorMessage}`);
    }
  }
};

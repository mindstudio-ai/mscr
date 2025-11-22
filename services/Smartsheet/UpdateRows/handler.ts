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
  if (!inputs.sheetId) {
    throw new Error('Sheet Id is required');
  }

  log(`Update Rows`);

  try {
    const queryParams: Record<string, string | number | boolean> = {};
    const requestBody: any = {};
    if (inputs.id !== undefined) {
      requestBody.id = inputs.id;
    }
    if (inputs.sheetId !== undefined) {
      requestBody.sheetId = inputs.sheetId;
    }
    if (inputs.siblingId !== undefined) {
      requestBody.siblingId = inputs.siblingId;
    }
    if (inputs.accessLevel !== undefined) {
      requestBody.accessLevel = inputs.accessLevel;
    }
    if (inputs.attachments !== undefined) {
      requestBody.attachments = inputs.attachments;
    }
    if (inputs.cells !== undefined) {
      requestBody.cells = inputs.cells;
    }
    if (inputs.columns !== undefined) {
      requestBody.columns = inputs.columns;
    }
    if (inputs.conditionalFormat !== undefined) {
      requestBody.conditionalFormat = inputs.conditionalFormat;
    }
    if (inputs.createdAt !== undefined) {
      requestBody.createdAt = inputs.createdAt;
    }
    if (inputs.createdBy !== undefined) {
      requestBody.createdBy = inputs.createdBy;
    }
    if (inputs.discussions !== undefined) {
      requestBody.discussions = inputs.discussions;
    }
    if (inputs.proof !== undefined) {
      requestBody.proof = inputs.proof;
    }
    if (inputs.expanded !== undefined) {
      requestBody.expanded = inputs.expanded;
    }
    if (inputs.filteredOut !== undefined) {
      requestBody.filteredOut = inputs.filteredOut;
    }
    if (inputs.format !== undefined) {
      requestBody.format = inputs.format;
    }
    if (inputs.inCriticalPath !== undefined) {
      requestBody.inCriticalPath = inputs.inCriticalPath;
    }
    if (inputs.locked !== undefined) {
      requestBody.locked = inputs.locked;
    }
    if (inputs.lockedForUser !== undefined) {
      requestBody.lockedForUser = inputs.lockedForUser;
    }
    if (inputs.modifiedAt !== undefined) {
      requestBody.modifiedAt = inputs.modifiedAt;
    }
    if (inputs.modifiedBy !== undefined) {
      requestBody.modifiedBy = inputs.modifiedBy;
    }
    if (inputs.permaLink !== undefined) {
      requestBody.permaLink = inputs.permaLink;
    }
    if (inputs.rowNumber !== undefined) {
      requestBody.rowNumber = inputs.rowNumber;
    }
    if (inputs.version !== undefined) {
      requestBody.version = inputs.version;
    }

    const response = await smartsheetApiRequest({
      method: 'PUT',
      path: `/sheets/${inputs.sheetId}/rows`,
      queryParams,
      body: requestBody,
    });

    log('Successfully completed operation');
    setOutput(inputs.outputVariable, response);
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error occurred';
    throw new Error(`Failed to update rows: ${errorMessage}`);
  }
};

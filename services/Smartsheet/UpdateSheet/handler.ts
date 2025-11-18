import { UpdateSheetInputs } from './type';
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
}: IHandlerContext<UpdateSheetInputs>) => {
  const {
    sheetId,
    sheetName,
    criticalPathEnabled,
    dependenciesEnabled,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }

  log(`Updating sheet with ID: ${sheetId}`);

  try {
    // Build update object with only provided fields
    const updateBody: any = {};

    if (sheetName) {
      updateBody.name = sheetName;
      log(`Setting new name: ${sheetName}`);
    }

    // Add user settings if provided
    if (criticalPathEnabled !== '' && criticalPathEnabled !== undefined) {
      if (!updateBody.userSettings) {
        updateBody.userSettings = {};
      }
      updateBody.userSettings.criticalPathEnabled =
        criticalPathEnabled === 'true' || criticalPathEnabled === true;
      log(
        `Setting critical path: ${updateBody.userSettings.criticalPathEnabled}`,
      );
    }

    if (dependenciesEnabled !== '' && dependenciesEnabled !== undefined) {
      if (!updateBody.userSettings) {
        updateBody.userSettings = {};
      }
      updateBody.userSettings.dependenciesEnabled =
        dependenciesEnabled === 'true' || dependenciesEnabled === true;
      log(
        `Setting dependencies: ${updateBody.userSettings.dependenciesEnabled}`,
      );
    }

    // Check if there are any updates to make
    if (Object.keys(updateBody).length === 0) {
      throw new Error('No update properties provided');
    }

    // Build query parameters
    const queryParams: Record<string, number> = {};
    if (inputs.accessApiLevel !== undefined) {
      queryParams.accessApiLevel = inputs.accessApiLevel;
    }

    // Update sheet
    const response = await smartsheetApiRequest({
      method: 'PUT',
      path: `/sheets/${sheetId}`,
      queryParams,
      body: updateBody,
    });

    log('Successfully updated sheet');

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
        `Permission denied. You must be an owner or admin to update this sheet.`,
      );
    } else if (
      errorMessage.includes('400') ||
      errorMessage.includes('Invalid')
    ) {
      throw new Error(`Invalid update parameters: ${errorMessage}`);
    } else {
      throw new Error(`Failed to update sheet: ${errorMessage}`);
    }
  }
};

import { ShareReportInputs } from './type';
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
}: IHandlerContext<ShareReportInputs>) => {
  if (!inputs.reportId) {
    throw new Error('Report Id is required');
  }

  log(`Share Report`);

  try {
    const queryParams: Record<string, string | number | boolean> = {};
    
    if (inputs.sendEmail !== undefined) {
      queryParams.sendEmail = inputs.sendEmail;
    }

    const requestBody: any = {};
  
    if (inputs.type !== undefined && inputs.type !== '') {
      requestBody.type = inputs.type;
    }
    if (inputs.accessLevel !== undefined && inputs.accessLevel !== '') {
      requestBody.accessLevel = inputs.accessLevel;
    }
    if (inputs.ccMe !== undefined) {
      // Handle boolean conversion (string "true"/"false" to boolean)
      requestBody.ccMe = typeof inputs.ccMe === 'string' 
        ? inputs.ccMe === 'true' 
        : inputs.ccMe;
    }
    if (inputs.createdAt !== undefined && inputs.createdAt !== '') {
      requestBody.createdAt = inputs.createdAt;
    }
    if (inputs.email !== undefined && inputs.email !== '') {
      requestBody.email = inputs.email;
    }
    if (inputs.message !== undefined && inputs.message !== '') {
      requestBody.message = inputs.message;
    }
    if (inputs.modifiedAt !== undefined && inputs.modifiedAt !== '') {
      requestBody.modifiedAt = inputs.modifiedAt;
    }
    if (inputs.scope !== undefined && inputs.scope !== '') {
      requestBody.scope = inputs.scope;
    }
    if (inputs.subject !== undefined && inputs.subject !== '') {
      requestBody.subject = inputs.subject;
    }

    const response = await smartsheetApiRequest({
      method: 'POST',
      path: `/reports/${inputs.reportId}/shares`,
      queryParams,
      body: requestBody,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    log('Successfully completed operation');
    setOutput(inputs.outputVariable, response);
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error occurred';
    throw new Error(`Failed to share report: ${errorMessage}`);
  }
};

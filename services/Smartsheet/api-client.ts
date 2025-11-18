import { BASE_URL } from './constants';
import fs from 'fs';
import FormData from 'form-data';
import fetch from 'node-fetch';

export interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  queryParams?: Record<string, string | number | boolean | undefined>;
  body?: any;
  headers?: Record<string, string>;
  multipart?: boolean;
  filePath?: string;
  fileName?: string;
}

export async function smartsheetApiRequest<T = any>(
  options: ApiRequestOptions,
): Promise<T> {
  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  // Build URL with query parameters
  const url = new URL(`${BASE_URL}${options.path}`);
  if (options.queryParams) {
    Object.entries(options.queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  // Build headers
  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    ...options.headers,
  };

  let body: any = undefined;

  // Handle multipart/form-data for file uploads
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

    // FormData will set the Content-Type header with boundary
    Object.assign(headers, form.getHeaders());
    body = form;
  } else if (options.body) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(options.body);
  }

  // Make the request using node-fetch
  const response = await fetch(url.toString(), {
    method: options.method || 'GET',
    headers,
    body: body,
  });

  // Handle response
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

  // Parse response
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const data = (await response.json()) as { result?: T } & T;
    // Handle Smartsheet response format (result property)
    return data as T;
  }

  return (await response.text()) as T;
}

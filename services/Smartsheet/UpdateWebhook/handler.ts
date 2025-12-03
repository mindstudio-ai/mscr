import { UpdateWebhookInputs } from './type';
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
}: IHandlerContext<UpdateWebhookInputs>) => {
  if (!inputs.webhookId) {
    throw new Error('Webhook Id is required');
  }

  log(`Update Webhook`);

  try {
    const requestBody: any = {};

    if (inputs.callbackUrl !== undefined && inputs.callbackUrl !== '') {
      requestBody.callbackUrl = inputs.callbackUrl;
    }
    if (inputs.events !== undefined && inputs.events && inputs.events.trim() !== '') {
      try {
        // Try to parse as JSON array first, otherwise treat as comma-separated
        const parsedEvents = JSON.parse(inputs.events);
        if (Array.isArray(parsedEvents)) {
          requestBody.events = parsedEvents;
        } else {
          requestBody.events = [parsedEvents];
        }
      } catch {
        // If not JSON, treat as comma-separated string
        requestBody.events = inputs.events.split(',').map((event: string) => event.trim()).filter((event: string) => event !== '');
      }
    }
    if (inputs.name !== undefined && inputs.name !== '') {
      requestBody.name = inputs.name;
    }
    if (inputs.version !== undefined && inputs.version !== '') {
      requestBody.version = typeof inputs.version === 'string' ? parseFloat(inputs.version) : inputs.version;
    }
    if (inputs.enabled !== undefined && inputs.enabled !== '') {
      // Handle boolean string or boolean
      if (typeof inputs.enabled === 'string') {
        requestBody.enabled = inputs.enabled === 'true';
      } else {
        requestBody.enabled = inputs.enabled;
      }
    }

    const response = await smartsheetApiRequest({
      method: 'PUT',
      path: `/webhooks/${inputs.webhookId}`,
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
    throw new Error(`Failed to update webhook: ${errorMessage}`);
  }
};

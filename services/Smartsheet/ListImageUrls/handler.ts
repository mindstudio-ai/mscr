import { ListImageUrlsInputs } from './type';
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
}: IHandlerContext<ListImageUrlsInputs>) => {
  const {
    imageid,
    error,
    refid,
    errorcode,
    message,
    height,
    url,
    width,
    imageidValue,
    errorValue,
    refidValue,
    errorcodeValue,
    messageValue,
    heightValue,
    urlValue,
    widthValue,
    outputVariable,
  } = inputs;
  const path = `/imageurls`;
  const body: Record<string, any> = {};
  if (imageid !== undefined) {
    body['imageId'] = imageid;
  }
  if (error !== undefined) {
    body['error'] = error;
  }
  if (refid !== undefined) {
    body['refId'] = refid;
  }
  if (errorcode !== undefined) {
    body['errorCode'] = errorcode;
  }
  if (message !== undefined) {
    body['message'] = message;
  }
  if (height !== undefined) {
    body['height'] = height;
  }
  if (url !== undefined) {
    body['url'] = url;
  }
  if (width !== undefined) {
    body['width'] = width;
  }
  if (imageidValue !== undefined) {
    body['imageId'] = imageidValue;
  }
  if (errorValue !== undefined) {
    body['error'] = errorValue;
  }
  if (refidValue !== undefined) {
    body['refId'] = refidValue;
  }
  if (errorcodeValue !== undefined) {
    body['errorCode'] = errorcodeValue;
  }
  if (messageValue !== undefined) {
    body['message'] = messageValue;
  }
  if (heightValue !== undefined) {
    body['height'] = heightValue;
  }
  if (urlValue !== undefined) {
    body['url'] = urlValue;
  }
  if (widthValue !== undefined) {
    body['width'] = widthValue;
  }

  const requestOptions: ApiRequestOptions = {
    method: 'POST',
    path,
  };
  if (Object.keys(body).length > 0) {
    requestOptions.body = body;
  }

  const response = await smartsheetApiRequest(requestOptions);
  setOutput(outputVariable, response);
};

import { AddAttachmentVersionInputs } from './type';
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
  fileBuffer?: Buffer;
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

  if (options.multipart && (options.filePath || options.fileBuffer)) {
    const form = new FormData();
    let fileName: string;

    if (options.fileBuffer) {
      fileName = options.fileName || 'file';
      form.append('file', options.fileBuffer, fileName);
    } else if (options.filePath) {
      const fileStream = fs.createReadStream(options.filePath);
      fileName =
        options.fileName || options.filePath.split('/').pop() || 'file';
      form.append('file', fileStream, fileName);
    }

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
    // Check if body is a Buffer or ArrayBuffer (binary data)
    if (Buffer.isBuffer(options.body) || options.body instanceof ArrayBuffer) {
      // If Content-Type is already set to octet-stream, use the body as-is
      if (headers['Content-Type'] === 'application/octet-stream') {
        body = Buffer.isBuffer(options.body) ? options.body : Buffer.from(options.body);
      } else {
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(options.body);
      }
    } else {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(options.body);
    }
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
}: IHandlerContext<AddAttachmentVersionInputs>) => {
  const { sheetId, attachmentId, fileUrl, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!attachmentId) {
    throw new Error('Attachment ID is required');
  }
  if (!fileUrl) {
    throw new Error('File URL is required');
  }

  log(`Adding new version to attachment ${attachmentId}`);

  try {
    // Fetch the file from the URL
    const fetchFile = await fetch(fileUrl);
    if (!fetchFile.ok) {
      throw new Error(
        `Failed to fetch file: ${fetchFile.status} ${fetchFile.statusText}`,
      );
    }
    const fileBuffer = await fetchFile.arrayBuffer();
    const fileBufferNode = Buffer.from(fileBuffer);

    // Extract filename from URL or use default
    const urlPath = new URL(fileUrl).pathname;
    const fileName = urlPath.split('/').pop() || 'file';

    const response = await smartsheetApiRequest({
      method: 'POST',
      path: `/sheets/${sheetId}/attachments/${attachmentId}/versions`,
      body: fileBufferNode,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Length': fileBufferNode.byteLength.toString(),
        'Accept': 'application/json',
      },
    });
    log(`Successfully added new version with ID: ${(response as any).id}`);
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to add version: ${error.message}`);
  }
};

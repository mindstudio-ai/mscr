import { promises as fs } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { randomBytes } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import * as mimeTypes from 'mime-types';

async function saveToTmp(data: Buffer, mimeType: string): Promise<string> {
  const ext = mimeTypes.extension(mimeType);
  const filename = `mock-upload-${Date.now()}-${randomBytes(6).toString('hex')}${ext ? `.${ext}` : ''}`;
  const filepath = join(tmpdir(), filename);
  await fs.writeFile(filepath, data);
  return pathToFileURL(filepath).toString();
}

export type ConnectorContext = {
  inputs: Record<string, unknown>;
  outputs: Record<string, any>;
  logs: string[];
};

export default async function runConnector<T extends Record<string, unknown>>(
  handler: (ctx: {
    inputs: T;
    setOutput: (variable: string, value: any) => void;
    log: (message: string) => void;
    uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
  }) => unknown | Promise<unknown>,
  inputs: T,
): Promise<ConnectorContext> {
  const outputs: Record<string, unknown> = {};
  const logs: string[] = [];

  await handler({
    inputs,
    setOutput: (variable, value) => {
      outputs[variable] = value;
    },
    log: (message) => {
      console.log(message);
      logs.push(message);
    },
    uploadFile: async (data, mimeType) => {
      const url = await saveToTmp(data, mimeType);
      logs.push(`(mock) saved file to ${url}`);
      console.log(`(mock) saved file to ${url}`);
      return url;
    },
  });

  return { inputs, outputs, logs };
}

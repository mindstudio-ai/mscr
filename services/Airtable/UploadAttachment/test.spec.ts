import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('uploads attachment to Airtable', async () => {
  process.env.token = process.env.AIRTABLE_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    baseId: 'appXXXXXXXXXXXXXX',
    recordId: 'recXXXXXXXXXXXXXX',
    attachmentField: 'Attachments',
    fileContent: 'SGVsbG8gd29ybGQ=', // "Hello world" in base64
    fileName: 'test.txt',
    contentType: 'text/plain',
    outputVariable: 'result',
  });

  expect(ctx.outputs.result).toBeTruthy();
});

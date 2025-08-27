import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('uploads file to MailChimp and saves output', async () => {
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    fileName: 'test-file.txt',
    fileContent: 'SGVsbG8gV29ybGQ=', // Base64 for "Hello World"
    outputVariable: 'uploadResult',
  });

  expect(ctx.outputs['uploadResult']).toBeTruthy();
});

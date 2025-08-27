import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates file and saves output to outputVar', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    fileId: '123456',
    fileName: 'updated-file-name.jpg',
    folderId: '789',
    outputVariable: 'outputVar',
  });

  expect(ctx.outputs['outputVar']).toBeTruthy();
});

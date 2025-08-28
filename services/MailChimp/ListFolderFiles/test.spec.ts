import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists files from a folder', async () => {
  // Setup environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    folderId: process.env.MAILCHIMP_TEST_FOLDER_ID || '1',
    fileType: '',
    sortField: 'added_date',
    sortDir: 'DESC',
    count: '10',
    outputVar: 'filesList',
  });

  expect(ctx.outputs['filesList']).toBeTruthy();
  expect(ctx.outputs['filesList'].files).toBeDefined();
});

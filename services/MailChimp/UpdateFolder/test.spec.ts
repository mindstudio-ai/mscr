import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates a MailChimp folder', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    folderId: process.env.TEST_FOLDER_ID || '123456',
    folderName: 'Updated Test Folder',
    outputVariable: 'updatedFolder',
  });

  expect(ctx.outputs['updatedFolder']).toBeTruthy();
  expect(ctx.outputs['updatedFolder'].name).toBe('Updated Test Folder');
});

import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a folder in Mailchimp File Manager', async () => {
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    folderName: 'Test Folder',
    outputVariable: 'folderData',
  });

  expect(ctx.outputs['folderData']).toBeTruthy();
  expect(ctx.outputs['folderData'].name).toBe('Test Folder');
});

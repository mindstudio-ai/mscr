import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves folder information', async () => {
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    folderId: '123456',
    fields: 'id,name,file_count',
    excludeFields: 'created_by',
    outputVariable: 'folderInfo',
  });

  expect(ctx.outputs['folderInfo']).toBeTruthy();
});

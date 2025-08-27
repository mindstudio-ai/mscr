import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves file information', async () => {
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    fileId: process.env.MAILCHIMP_TEST_FILE_ID || '123456',
    fields: 'id,name,full_size_url',
    excludeFields: '_links',
    outputVar: 'fileInfo',
  });

  expect(ctx.outputs['fileInfo']).toBeTruthy();
});

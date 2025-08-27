import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists files from MailChimp', async () => {
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    count: '5',
    outputVar: 'filesList',
  });

  expect(ctx.outputs['filesList']).toBeTruthy();
  expect(ctx.outputs['filesList'].files).toBeDefined();
});

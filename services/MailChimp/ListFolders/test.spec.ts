import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists folders and saves to output variable', async () => {
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outputVariable: 'foldersList',
    count: '5',
  });

  expect(ctx.outputs['foldersList']).toBeTruthy();
  expect(ctx.outputs['foldersList'].folders).toBeDefined();
});

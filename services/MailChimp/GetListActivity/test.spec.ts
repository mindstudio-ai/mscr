import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves list activity and saves to output variable', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: process.env.MAILCHIMP_TEST_LIST_ID,
    count: '5',
    offset: '0',
    outputVariable: 'listActivity',
  });

  expect(ctx.outputs['listActivity']).toBeTruthy();
  expect(ctx.outputs['listActivity'].list_id).toBe(
    process.env.MAILCHIMP_TEST_LIST_ID,
  );
  expect(ctx.outputs['listActivity'].activity).toBeDefined();
});

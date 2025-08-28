import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves list locations and saves to output variable', async () => {
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: process.env.MAILCHIMP_TEST_LIST_ID,
    outputVariable: 'locationData',
  });

  expect(ctx.outputs['locationData']).toBeTruthy();
  expect(ctx.outputs['locationData'].locations).toBeDefined();
});

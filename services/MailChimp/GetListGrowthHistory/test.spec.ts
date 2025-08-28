import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves list growth history and saves to output variable', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');

  // Run the connector with test inputs
  const ctx = await runConnector(handler, {
    listId: process.env.MAILCHIMP_TEST_LIST_ID || 'test-list-id',
    month: '2023-01',
    outputVariable: 'growthHistory',
  });

  // Verify output was set
  expect(ctx.outputs['growthHistory']).toBeTruthy();
});

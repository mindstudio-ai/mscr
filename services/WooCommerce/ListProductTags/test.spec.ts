import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves product tags and saves to output variable', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'test_consumer_key';
  process.env.consumerSecret = 'test_consumer_secret';

  const { handler } = await import('./handler.ts');

  // Mock fetch is automatically handled by the test harness
  const ctx = await runConnector(handler, {
    page: '1',
    perPage: '10',
    order: 'asc',
    orderby: 'name',
    hideEmpty: 'false',
    outputVariable: 'productTags',
  });

  // Just check that the output variable was set
  expect(ctx.outputs.productTags).toBeTruthy();
});

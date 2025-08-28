import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a WooCommerce product tag', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'test_consumer_key';
  process.env.consumerSecret = 'test_consumer_secret';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    name: 'Test Tag',
    slug: 'test-tag',
    description: 'This is a test tag',
    outputVariable: 'tagResult',
  });

  expect(ctx.outputs['tagResult']).toBeTruthy();
});

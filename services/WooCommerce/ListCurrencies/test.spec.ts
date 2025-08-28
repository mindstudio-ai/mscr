import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves currencies list', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'test_consumer_key';
  process.env.consumerSecret = 'test_consumer_secret';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outputVariable: 'currencies',
  });

  // Just verify that the output is set
  expect(ctx.outputs['currencies']).toBeDefined();
});

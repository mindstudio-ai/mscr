import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a tax class and saves output', async () => {
  // Set environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'test_consumer_key';
  process.env.consumerSecret = 'test_consumer_secret';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    name: 'Test Tax Class',
    outputVariable: 'taxClassOutput',
  });

  expect(ctx.outputs['taxClassOutput']).toBeTruthy();
});

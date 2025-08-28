import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves current currency information', async () => {
  // Set environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'test_consumer_key';
  process.env.consumerSecret = 'test_consumer_secret';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outputVariable: 'currencyInfo',
  });

  expect(ctx.outputs['currencyInfo']).toBeTruthy();
  expect(ctx.outputs['currencyInfo'].code).toBeDefined();
  expect(ctx.outputs['currencyInfo'].name).toBeDefined();
  expect(ctx.outputs['currencyInfo'].symbol).toBeDefined();
});

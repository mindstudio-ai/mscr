import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves payment gateways and saves to output variable', async () => {
  // Set environment variables needed for the test
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'test_consumer_key';
  process.env.consumerSecret = 'test_consumer_secret';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outputVariable: 'paymentGateways',
  });

  expect(ctx.outputs['paymentGateways']).toBeTruthy();
});

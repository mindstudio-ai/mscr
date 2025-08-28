import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves shipping zone data', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'test_consumer_key';
  process.env.consumerSecret = 'test_consumer_secret';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    zoneId: '5',
    outputVariable: 'shippingZone',
  });

  expect(ctx.outputs['shippingZone']).toBeTruthy();
});

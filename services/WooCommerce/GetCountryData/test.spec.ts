import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves country data and saves to output variable', async () => {
  // Set environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'test_consumer_key';
  process.env.consumerSecret = 'test_consumer_secret';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    countryCode: 'us',
    outputVariable: 'countryData',
  });

  expect(ctx.outputs['countryData']).toBeTruthy();
});

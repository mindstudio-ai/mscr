import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('fetches continents and saves to output variable', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'test_consumer_key';
  process.env.consumerSecret = 'test_consumer_secret';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outputVariable: 'continents',
  });

  expect(ctx.outputs['continents']).toBeTruthy();
});

import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves continent data and saves to output variable', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'test_consumer_key';
  process.env.consumerSecret = 'test_consumer_secret';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    continentCode: 'eu',
    outputVariable: 'continentData',
  });

  expect(ctx.outputs['continentData']).toBeTruthy();
});

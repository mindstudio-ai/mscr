import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves product attribute term', async () => {
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'test_consumer_key';
  process.env.consumerSecret = 'test_consumer_secret';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    attributeId: '2',
    termId: '23',
    outputVariable: 'attributeTerm',
  });

  expect(ctx.outputs['attributeTerm']).toBeTruthy();
});

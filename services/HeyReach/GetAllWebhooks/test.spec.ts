import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves webhooks and saves to output variable', async () => {
  process.env.apiKey = process.env.HEYREACH_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    offset: '0',
    limit: '10',
    outputVariable: 'webhooks',
  });

  expect(ctx.outputs['webhooks']).toBeTruthy();
  expect(ctx.outputs['webhooks']).toHaveProperty('items');
  expect(ctx.outputs['webhooks']).toHaveProperty('totalCount');
});

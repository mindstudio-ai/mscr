import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves webhook details by ID', async () => {
  process.env.apiKey = process.env.HEYREACH_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    webhookId: '123',
    outputVariable: 'webhookDetails',
  });

  expect(ctx.outputs['webhookDetails']).toBeTruthy();
});

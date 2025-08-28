import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves campaign by ID', async () => {
  process.env.apiKey = process.env.HEYREACH_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    campaignId: '123456789',
    outputVariable: 'campaignData',
  });

  expect(ctx.outputs['campaignData']).toBeTruthy();
});

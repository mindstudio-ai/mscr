import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('pauses campaign and saves output', async () => {
  process.env.apiKey = process.env.HEYREACH_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    campaignId: '123456',
    outputVariable: 'pauseResult',
  });

  expect(ctx.outputs['pauseResult']).toBeTruthy();
});

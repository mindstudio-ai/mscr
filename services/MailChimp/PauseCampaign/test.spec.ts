import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('pauses campaign and saves output', async () => {
  // Set environment variables
  process.env.apiKey = 'test-api-key';
  process.env.serverPrefix = 'us1';

  const { handler } = await import('./handler.ts');

  // Mock a campaign ID
  const ctx = await runConnector(handler, {
    campaignId: 'test-campaign-id',
    outputVariable: 'pauseResult',
  });

  expect(ctx.outputs['pauseResult']).toBeTruthy();
});

import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('resends campaign and saves output', async () => {
  // Mock environment variables
  process.env.apiKey = 'test-api-key';
  process.env.serverPrefix = 'us1';

  const { handler } = await import('./handler.ts');

  // Mock the inputs
  const ctx = await runConnector(handler, {
    campaignId: 'test-campaign-id',
    shortcutType: 'to_non_openers',
    outputVariable: 'resendResult',
  });

  // Just verify the output was set
  expect(ctx.outputs['resendResult']).toBeTruthy();
});

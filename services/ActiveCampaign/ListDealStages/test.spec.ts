import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists deal stages and saves to output variable', async () => {
  // Set environment variables
  process.env.accessToken = process.env.ACTIVECAMPAIGN_API_KEY;
  process.env.accountIdentifier = process.env.ACTIVECAMPAIGN_BASE_URL;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    titleFilter: '',
    pipelineId: '',
    orderByTitle: '',
    outputVariable: 'dealStages',
  });

  expect(ctx.outputs['dealStages']).toBeTruthy();
  expect(Array.isArray(ctx.outputs['dealStages'])).toBe(true);
});

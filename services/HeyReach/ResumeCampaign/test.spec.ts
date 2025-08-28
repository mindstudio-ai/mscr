import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('resumes campaign and saves output', async () => {
  // Set up environment
  process.env.apiKey = process.env.HEYREACH_API_KEY;

  const { handler } = await import('./handler.ts');

  // Mock campaign ID
  const ctx = await runConnector(handler, {
    campaignId: '123456789',
    outputVariable: 'resumedCampaign',
  });

  // Check that output was set
  expect(ctx.outputs['resumedCampaign']).toBeTruthy();
});

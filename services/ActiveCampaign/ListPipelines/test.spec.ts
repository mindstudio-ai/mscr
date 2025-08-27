import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('fetches pipelines and saves to output variable', async () => {
  // Set up environment variables
  process.env.accessToken = process.env.ACTIVECAMPAIGN_API_KEY;
  process.env.accountIdentifier = process.env.ACTIVECAMPAIGN_ACCOUNT_URL;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    filterTitle: '',
    haveStages: '',
    orderTitle: '',
    orderPopular: '',
    outputVariable: 'pipelines',
  });

  expect(ctx.outputs['pipelines']).toBeTruthy();
  expect(Array.isArray(ctx.outputs['pipelines'])).toBe(true);
});

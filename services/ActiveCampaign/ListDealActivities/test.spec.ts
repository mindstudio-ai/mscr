import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists deal activities and saves to output variable', async () => {
  process.env.accessToken = process.env.ACTIVECAMPAIGN_API_KEY;
  process.env.accountIdentifier = process.env.ACTIVECAMPAIGN_ACCOUNT_URL;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outputVariable: 'dealActivities',
  });

  expect(ctx.outputs['dealActivities']).toBeTruthy();
  expect(Array.isArray(ctx.outputs['dealActivities'])).toBe(true);
});

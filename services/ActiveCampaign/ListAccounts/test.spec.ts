import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists accounts successfully', async () => {
  process.env.accessToken = process.env.ACTIVECAMPAIGN_API_KEY;
  process.env.accountIdentifier = process.env.ACTIVECAMPAIGN_ACCOUNT_URL;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    search: '',
    countDeals: 'false',
    outputVariable: 'accounts',
  });

  expect(ctx.outputs['accounts']).toBeTruthy();
  expect(Array.isArray(ctx.outputs['accounts'])).toBe(true);
});

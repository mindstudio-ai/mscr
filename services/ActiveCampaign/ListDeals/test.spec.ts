import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('list deals returns results', async () => {
  process.env.accessToken = process.env.ACTIVECAMPAIGN_API_KEY;
  process.env.accountIdentifier = process.env.ACTIVECAMPAIGN_ACCOUNT_URL;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    limit: '5',
    outputVariable: 'deals',
  });

  expect(ctx.outputs['deals']).toBeTruthy();
  expect(Array.isArray(ctx.outputs['deals'])).toBe(true);
});

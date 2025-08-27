import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists contacts and saves to output variable', async () => {
  process.env.accessToken = process.env.ACTIVECAMPAIGN_API_KEY;
  process.env.accountIdentifier = process.env.ACTIVECAMPAIGN_ACCOUNT_URL;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    limit: '5',
    outputVariable: 'contactsList',
  });

  expect(ctx.outputs['contactsList']).toBeTruthy();
  expect(Array.isArray(ctx.outputs['contactsList'].contacts)).toBe(true);
});

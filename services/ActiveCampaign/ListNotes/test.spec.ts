import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves notes and saves to output variable', async () => {
  // Set environment variables
  process.env.accessToken = process.env.ACTIVECAMPAIGN_API_KEY;
  process.env.accountIdentifier = process.env.ACTIVECAMPAIGN_ACCOUNT_URL;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outputVariable: 'notesList',
    limit: '10',
    offset: '0',
  });

  expect(ctx.outputs['notesList']).toBeTruthy();
  expect(Array.isArray(ctx.outputs['notesList'])).toBe(true);
});

import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates account note and saves output', async () => {
  // Setup environment variables
  process.env.accessToken = process.env.ACTIVECAMPAIGN_API_KEY;
  process.env.accountIdentifier = process.env.ACTIVECAMPAIGN_ACCOUNT_URL;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    accountId: '1',
    noteContent: 'Test note from connector',
    outputVariable: 'noteResult',
  });

  expect(ctx.outputs['noteResult']).toBeTruthy();
});

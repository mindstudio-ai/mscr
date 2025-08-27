import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a deal note and saves output', async () => {
  // Set environment variables
  process.env.accessToken = process.env.ACTIVECAMPAIGN_API_KEY;
  process.env.accountIdentifier = process.env.ACTIVECAMPAIGN_ACCOUNT_URL;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    dealId: '1',
    noteContent: 'Test note content',
    outputVariable: 'dealNoteResult',
  });

  expect(ctx.outputs['dealNoteResult']).toBeTruthy();
});

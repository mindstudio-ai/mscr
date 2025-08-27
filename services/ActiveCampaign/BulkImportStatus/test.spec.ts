import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves bulk import status', async () => {
  // Set environment variables
  process.env.accessToken = process.env.ACTIVECAMPAIGN_API_KEY;
  process.env.accountIdentifier = process.env.ACTIVECAMPAIGN_ACCOUNT_URL;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outputVariable: 'bulkImportStatus',
  });

  expect(ctx.outputs['bulkImportStatus']).toBeTruthy();
});

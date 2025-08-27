import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets bulk import status', async () => {
  process.env.accessToken = process.env.ACTIVECAMPAIGN_API_KEY;
  process.env.accountIdentifier = process.env.ACTIVECAMPAIGN_ACCOUNT_URL;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    batchId: '123456',
    outputVariable: 'importStatus',
  });

  expect(ctx.outputs['importStatus']).toBeTruthy();
});

import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates list status for a contact', async () => {
  process.env.accessToken = process.env.ACTIVECAMPAIGN_API_KEY;
  process.env.accountIdentifier = process.env.ACTIVECAMPAIGN_ACCOUNT_URL;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    contactId: '123',
    listId: '456',
    status: '1',
    sourceId: '0',
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeTruthy();
});

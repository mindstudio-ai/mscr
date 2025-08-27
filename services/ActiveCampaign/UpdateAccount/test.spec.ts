import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates account and saves output', async () => {
  process.env.accessToken = process.env.ACTIVECAMPAIGN_API_KEY;
  process.env.accountIdentifier = process.env.ACTIVECAMPAIGN_BASE_URL;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    accountId: '1',
    name: 'Updated Test Account',
    accountUrl: 'https://www.example.com',
    customFields: [
      {
        customFieldId: 9,
        fieldValue: '500-1000',
      },
    ],
    outputVariable: 'updatedAccount',
  });

  expect(ctx.outputs['updatedAccount']).toBeTruthy();
});

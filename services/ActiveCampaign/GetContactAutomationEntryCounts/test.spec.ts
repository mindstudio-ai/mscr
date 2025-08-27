import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves automation entry counts for a contact', async () => {
  process.env.accessToken = process.env.ACTIVECAMPAIGN_API_KEY;
  process.env.accountIdentifier = process.env.ACTIVECAMPAIGN_BASE_URL;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    contactId: '123',
    outputVariable: 'automationCounts',
  });

  expect(ctx.outputs['automationCounts']).toBeTruthy();
});

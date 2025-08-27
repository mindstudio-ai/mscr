import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('adds contact to automation', async () => {
  process.env.accessToken = process.env.ACTIVECAMPAIGN_API_KEY;
  process.env.accountIdentifier = process.env.ACTIVECAMPAIGN_ACCOUNT_URL;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    contactId: '117',
    automationId: '42',
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeTruthy();
});

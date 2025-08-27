import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves association details', async () => {
  process.env.accessToken = process.env.ACTIVECAMPAIGN_API_KEY;
  process.env.accountIdentifier = process.env.ACTIVECAMPAIGN_BASE_URL;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    associationId: '1', // Use a test ID
    outputVariable: 'associationDetails',
  });

  expect(ctx.outputs['associationDetails']).toBeTruthy();
});

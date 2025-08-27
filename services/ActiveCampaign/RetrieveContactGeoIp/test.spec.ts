import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves geo IP address information', async () => {
  process.env.accessToken = process.env.ACTIVECAMPAIGN_API_KEY;
  process.env.accountIdentifier = process.env.ACTIVECAMPAIGN_ACCOUNT_URL;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    geoAddressID: '1', // Use a test geo address ID
    outputVariable: 'geoAddressInfo',
  });

  expect(ctx.outputs['geoAddressInfo']).toBeTruthy();
});

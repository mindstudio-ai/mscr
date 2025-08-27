import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves contact geo-IPs and saves to output variable', async () => {
  // Set up environment variables
  process.env.accessToken = 'test-token';
  process.env.accountIdentifier = 'https://testaccount.api-us1.com';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    contactId: '123',
    outputVariable: 'geoIpData',
  });

  expect(ctx.outputs['geoIpData']).toBeDefined();
});

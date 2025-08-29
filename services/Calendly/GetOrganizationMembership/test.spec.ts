import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves organization membership details', async () => {
  // Setup environment variables
  process.env.token = 'test_token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    organizationMembershipUuid: '12345678-1234-1234-1234-123456789012',
    outputVariable: 'membershipDetails',
  });

  expect(ctx.outputs['membershipDetails']).toBeTruthy();
});

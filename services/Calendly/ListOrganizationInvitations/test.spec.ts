import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists organization invitations', async () => {
  // Set up environment variables
  process.env.token = 'mock-token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    organizationUri: 'https://api.calendly.com/organizations/ORGANIZATION_UUID',
    count: '25',
    outputVariable: 'invitations',
  });

  expect(ctx.outputs['invitations']).toBeDefined();
});

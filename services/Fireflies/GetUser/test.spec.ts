import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('fetches user details and saves to output variable', async () => {
  process.env.apiKey = process.env.FIREFLIES_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    userId: '', // Empty to get current user
    includeBasicInfo: 'true',
    includeIntegrations: 'true',
    includeUserGroups: 'false',
    includeUsageStats: 'false',
    outputVariable: 'userDetails',
  });

  expect(ctx.outputs['userDetails']).toBeTruthy();
});

import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists outgoing communications', async () => {
  process.env.token = 'mock_token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    organizationUri: 'https://api.calendly.com/organizations/ORGANIZATION_UUID',
    status: 'all',
    sort: 'created_at:desc',
    pageSize: '25',
    outputVariable: 'communications',
  });

  expect(ctx.outputs['communications']).toBeTruthy();
});

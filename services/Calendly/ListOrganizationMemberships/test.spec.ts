import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists organization memberships', async () => {
  process.env.token = 'test_token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    organizationUuid: 'test-org-uuid',
    count: '10',
    outputVariable: 'memberships',
  });

  expect(ctx.outputs['memberships']).toBeTruthy();
});

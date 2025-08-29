import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves account workspaces', async () => {
  process.env.token = 'test-token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    accountId: 'test-account',
    search: '',
    page: '1',
    pageSize: '10',
    outputVariable: 'workspaces',
  });

  expect(ctx.outputs['workspaces']).toBeTruthy();
});

import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves workspaces and saves to output variable', async () => {
  process.env.token = 'mock-token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    search: '',
    page: '1',
    pageSize: '10',
    outputVariable: 'workspaces',
  });

  expect(ctx.outputs['workspaces']).toBeTruthy();
});

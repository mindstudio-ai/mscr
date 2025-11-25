import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';
import { handler } from './handler';

test('ListWorkspaceFolders executes successfully', async () => {
  process.env.accessToken = process.env.accessToken;

  const ctx = await runConnector(handler, {
    workspaceId: 'workspaceId-sample',
    includeall: true,
    page: 1,
    pagesize: 1,
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeDefined();
});

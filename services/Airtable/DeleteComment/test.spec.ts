import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes a comment and saves output', async () => {
  process.env.token = 'test_token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    baseId: 'appXXXXXXXXXXXXXX',
    tableIdOrName: 'tblXXXXXXXXXXXXXX',
    recordId: 'recXXXXXXXXXXXXXX',
    commentId: 'comXXXXXXXXXXXXXX',
    outputVariable: 'deleteResult',
  });

  expect(ctx.outputs['deleteResult']).toBeTruthy();
});

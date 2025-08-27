import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes records and saves output', async () => {
  process.env.token = 'test_token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    baseId: 'app123456',
    tableIdOrName: 'My Table',
    recordIds: 'rec123, rec456',
    outputVariable: 'deleteResult',
  });

  expect(ctx.outputs['deleteResult']).toBeTruthy();
});

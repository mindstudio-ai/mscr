import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates table and saves output to variable', async () => {
  process.env.token = 'test_token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    baseId: 'appXXXXXXXXXXXXXX',
    tableIdOrName: 'tblXXXXXXXXXXXXXX',
    name: 'Updated Table Name',
    description: 'Updated table description',
    outputVariable: 'updatedTable',
  });

  expect(ctx.outputs['updatedTable']).toBeTruthy();
});

test('throws error when no update fields are provided', async () => {
  process.env.token = 'test_token';

  const { handler } = await import('./handler.ts');

  await expect(
    runConnector(handler, {
      baseId: 'appXXXXXXXXXXXXXX',
      tableIdOrName: 'tblXXXXXXXXXXXXXX',
      outputVariable: 'updatedTable',
    }),
  ).rejects.toThrow();
});

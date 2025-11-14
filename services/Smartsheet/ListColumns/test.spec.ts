import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists sheet columns', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    outputVariable: 'columns',
  });
  expect(ctx.outputs['columns'].columns).toBeDefined();
});

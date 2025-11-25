import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists discussions', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    outputVariable: 'discussions',
  });
  expect(ctx.outputs['discussions'].discussions).toBeDefined();
});

import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates sheet summary fields', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    fieldsJson: '[{"id": 123, "value": "Updated"}]',
    outputVariable: 'result',
  });
  expect(ctx.outputs['result']).toBeTruthy();
});

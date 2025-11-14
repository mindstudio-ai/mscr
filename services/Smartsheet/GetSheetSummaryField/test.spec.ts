import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets sheet summary field', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    fieldId: 'test-field-id',
    outputVariable: 'field',
  });
  expect(ctx.outputs['field']).toBeTruthy();
});

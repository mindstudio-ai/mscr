import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('adds sheet summary fields', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    fieldsJson: '[{"title": "Status", "type": "TEXT_NUMBER"}]',
    outputVariable: 'result',
  });
  expect(ctx.outputs['result']).toBeTruthy();
});

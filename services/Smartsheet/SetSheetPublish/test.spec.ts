import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('sets sheet publish status', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    outputVariable: 'result',
    readOnlyLiteEnabled: true,
    readOnlyFullEnabled: true,
    icalEnabled: true,
    readWriteEnabled: true,
    readOnlyFullAccessibleBy: 'ALL',
    readOnlyFullDefaultView: 'CALENDAR',
    readOnlyFullShowToolbar: true,
  });
  expect(ctx.outputs['result']).toBeTruthy();
});

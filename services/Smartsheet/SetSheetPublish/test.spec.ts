import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';
import { BooleanValue } from './type.ts';

test('sets sheet publish status', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    outputVariable: 'result',
    publishSettings: {
      readOnlyLiteEnabled: 'true' as BooleanValue,
      readOnlyFullEnabled: 'true' as BooleanValue,
      icalEnabled: 'true' as BooleanValue,
      readWriteEnabled: 'true' as BooleanValue,
      readOnlyFullAccessibleBy: 'ALL',
      readOnlyFullDefaultView: 'CALENDAR',
      readOnlyFullShowToolbar: 'true' as BooleanValue,
    },
  });
  expect(ctx.outputs['result']).toBeTruthy();
});

import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';
import { handler } from './handler';

test('CopyRowsToAnotherSheet executes successfully', async () => {
  process.env.accessToken = process.env.accessToken;

  const ctx = await runConnector(handler, {
    sheetId: 'sheetId-sample',
    include: 'include-value',
    ignorerowsnotfound: true,
    rowids: 'rowids-value',
    toSheetid: 'toSheetid-value',
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeDefined();
});

import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';
import { handler } from './handler';

test('SortRowsInSheet executes successfully', async () => {
  process.env.accessToken = process.env.accessToken;

  const ctx = await runConnector(handler, {
    sheetId: 'sheetId-sample',
    includeExclude: 'includeExclude-value',
    sortcriteria: 'sortcriteria-value',
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeDefined();
});

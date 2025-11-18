import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';
import { handler } from './handler';

test('ListDiscussionsWithRow executes successfully', async () => {
  process.env.accessToken = process.env.accessToken;

  const ctx = await runConnector(handler, {
    sheetId: 'sheetId-sample',
    rowId: 'rowId-sample',
    include: 'include-value',
    page: 1,
    pagesize: 1,
    includeall: true,
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeDefined();
});

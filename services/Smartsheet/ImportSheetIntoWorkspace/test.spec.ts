import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';
import { handler } from './handler';

test('ImportSheetIntoWorkspace executes successfully', async () => {
  process.env.accessToken = process.env.accessToken;

  const ctx = await runConnector(handler, {
    workspaceId: 'workspaceId-sample',
    sheetname: 'sheetname-value',
    headerrowindex: 1,
    primarycolumnindex: 1,
    filePath: './path/to/file.txt',
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeDefined();
});

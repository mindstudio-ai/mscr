import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';
import { handler } from './handler';

test('CreateProof executes successfully', async () => {
  process.env.accessToken = process.env.accessToken;

  const ctx = await runConnector(handler, {
    sheetId: 'sheetId-sample',
    rowId: 'rowId-sample',
    filePath: './path/to/file.txt',
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeDefined();
});

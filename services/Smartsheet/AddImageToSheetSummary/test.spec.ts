import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';
import { handler } from './handler';

test('AddImageToSheetSummary executes successfully', async () => {
  process.env.accessToken = process.env.accessToken;

  const ctx = await runConnector(handler, {
    sheetId: 'sheetId-sample',
    fieldId: 'fieldId-sample',
    alttext: 'alttext-value',
    overridevalidation: true,
    filePath: './path/to/file.txt',
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeDefined();
});

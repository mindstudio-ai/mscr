import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates Airtable field and saves output', async () => {
  process.env.token = 'mock-token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    baseId: 'appXXXXXXXXXXXXXX',
    tableId: 'tblXXXXXXXXXXXXXX',
    fieldId: 'fldXXXXXXXXXXXXXX',
    fieldName: 'Updated Field Name',
    fieldDescription: 'Updated field description',
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeTruthy();
});

test('requires at least fieldName or fieldDescription', async () => {
  process.env.token = 'mock-token';

  const { handler } = await import('./handler.ts');

  await expect(
    runConnector(handler, {
      baseId: 'appXXXXXXXXXXXXXX',
      tableId: 'tblXXXXXXXXXXXXXX',
      fieldId: 'fldXXXXXXXXXXXXXX',
      outputVariable: 'result',
    }),
  ).rejects.toThrow();
});

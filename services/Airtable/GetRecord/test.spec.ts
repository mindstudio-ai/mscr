import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves a record from Airtable', async () => {
  process.env.token = process.env.AIRTABLE_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    baseId: 'appXXXXXXXXXXXXXX',
    tableIdOrName: 'Table Name',
    recordId: 'recXXXXXXXXXXXXXX',
    cellFormat: 'json',
    returnFieldsByFieldId: false,
    outputVariable: 'record',
  });

  expect(ctx.outputs['record']).toBeTruthy();
});

import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates an Airtable record', async () => {
  process.env.token = process.env.AIRTABLE_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    baseId: 'appXXXXXXXXXXXXXX',
    tableIdOrName: 'tblXXXXXXXXXXXXXX',
    recordId: 'recXXXXXXXXXXXXXX',
    fields: { Name: 'Test Name', Status: 'Complete' },
    typecast: 'false',
    returnFieldsByFieldId: 'false',
    outputVariable: 'updatedRecord',
  });

  expect(ctx.outputs['updatedRecord']).toBeTruthy();
});

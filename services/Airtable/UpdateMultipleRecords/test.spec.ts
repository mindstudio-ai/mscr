import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates multiple records in Airtable', async () => {
  process.env.token = 'dummy_token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    baseId: 'appXXXXXXXXXXXXXX',
    tableIdOrName: 'Table Name',
    records: [
      {
        id: 'recXXXXXXXXXXXXXX',
        fields: {
          Name: 'Updated Name',
          Status: 'Complete',
        },
      },
    ],
    typecast: 'false',
    returnFieldsByFieldId: 'false',
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeTruthy();
});

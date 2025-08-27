import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a table in Airtable', async () => {
  process.env.token = process.env.AIRTABLE_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    baseId: 'appXXXXXXXXXXXXXX',
    tableName: 'Test Table',
    tableDescription: 'A test table created by the connector',
    fields: [
      { name: 'Name', type: 'singleLineText' },
      { name: 'Notes', type: 'multilineText' },
      { name: 'Complete', type: 'checkbox' },
    ],
    outputVariable: 'tableInfo',
  });

  expect(ctx.outputs['tableInfo']).toBeTruthy();
});

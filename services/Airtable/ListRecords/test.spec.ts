import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists records from Airtable', async () => {
  process.env.token = process.env.AIRTABLE_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    baseId: 'appXXXXXXXXXXXXX',
    tableIdOrName: 'My Table',
    outputVariable: 'records',
  });

  expect(ctx.outputs['records']).toBeTruthy();
});

test('handles filtering and sorting', async () => {
  process.env.token = process.env.AIRTABLE_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    baseId: 'appXXXXXXXXXXXXX',
    tableIdOrName: 'My Table',
    maxRecords: '10',
    fields: 'Name, Email',
    sortField: 'Name',
    sortDirection: 'asc',
    outputVariable: 'filteredRecords',
  });

  expect(ctx.outputs['filteredRecords']).toBeTruthy();
});

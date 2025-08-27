import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a field in Airtable and saves output', async () => {
  // Set up environment variables
  process.env.token = process.env.AIRTABLE_TOKEN;

  const { handler } = await import('./handler.ts');

  // Mock inputs for the test
  const ctx = await runConnector(handler, {
    baseId: 'appXXXXXXXXXXXXXX',
    tableId: 'tblXXXXXXXXXXXXXX',
    fieldName: 'Test Field',
    fieldType: 'singleLineText',
    fieldDescription: 'A test field created by the connector',
    outputVariable: 'createdField',
  });

  // Verify output was set
  expect(ctx.outputs['createdField']).toBeTruthy();
});

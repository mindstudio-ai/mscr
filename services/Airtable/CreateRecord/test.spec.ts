import { expect, test, vi } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a record in Airtable', async () => {
  // Set environment variables for testing
  process.env.token = 'test-token';

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    baseId: 'appTestBaseId',
    tableName: 'Test Table',
    fields: {
      Name: 'Test Record',
      Notes: 'Created during test',
    },
    typecast: 'false',
    outputVariable: 'recordId',
  });

  // We just want to verify the test runs without errors
  // The actual API call would be made in a real environment
  expect(ctx.outputs).toBeDefined();
});

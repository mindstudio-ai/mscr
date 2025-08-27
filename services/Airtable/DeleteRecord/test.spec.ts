import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes a record and returns the result', async () => {
  // Set up environment variables
  process.env.token = process.env.AIRTABLE_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    baseId: 'app12345abcde',
    tableIdOrName: 'Table Name',
    recordId: 'rec123456',
    outputVariable: 'deleteResult',
  });

  expect(ctx.outputs['deleteResult']).toBeTruthy();
});

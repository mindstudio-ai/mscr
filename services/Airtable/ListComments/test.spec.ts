import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves comments for a record', async () => {
  process.env.token = process.env.AIRTABLE_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    baseId: 'appXXXXXXXXXXXXXX',
    tableIdOrName: 'tblXXXXXXXXXXXXXX',
    recordId: 'recXXXXXXXXXXXXXX',
    outputVariable: 'commentsResult',
  });

  expect(ctx.outputs['commentsResult']).toBeTruthy();
});

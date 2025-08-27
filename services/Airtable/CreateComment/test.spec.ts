import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a comment and saves output', async () => {
  process.env.token = process.env.AIRTABLE_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    baseId: 'appXXXXXXXXXXXXXX',
    tableIdOrName: 'tblXXXXXXXXXXXXXX',
    recordId: 'recXXXXXXXXXXXXXX',
    commentText: 'Test comment from connector',
    outputVariable: 'commentResult',
  });

  expect(ctx.outputs['commentResult']).toBeTruthy();
});

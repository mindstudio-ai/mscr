import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates account note and saves output', async () => {
  // Set environment variables
  process.env.accessToken = 'test-token';
  process.env.accountIdentifier = 'https://example.api-us1.com';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    accountId: '1',
    noteId: '2',
    noteContent: 'Updated note content',
    outputVariable: 'updatedNote',
  });

  expect(ctx.outputs['updatedNote']).toBeTruthy();
  expect(ctx.outputs['updatedNote'].note.id).toBe('2');
});

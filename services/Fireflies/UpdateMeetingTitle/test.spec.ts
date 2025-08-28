import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates meeting title and saves output', async () => {
  process.env.apiKey = process.env.FIREFLIES_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    transcriptId: 'test-transcript-id',
    newTitle: 'Updated Meeting Title',
    outputVariable: 'updatedTitle',
  });

  expect(ctx.outputs['updatedTitle']).toBeTruthy();
});

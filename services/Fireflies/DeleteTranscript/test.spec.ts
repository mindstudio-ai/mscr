import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes transcript and saves output', async () => {
  // Set up environment variables
  process.env.apiKey = process.env.FIREFLIES_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    transcriptId: 'test_transcript_id',
    outputVariable: 'deletedTranscript',
  });

  expect(ctx.outputs['deletedTranscript']).toBeTruthy();
});

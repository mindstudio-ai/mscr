import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a bite and saves output to variable', async () => {
  // Setup environment
  process.env.apiKey = process.env.FIREFLIES_API_KEY;

  // Import handler
  const { handler } = await import('./handler.ts');

  // Run connector with test inputs
  const ctx = await runConnector(handler, {
    transcriptId: 'test_transcript_id',
    startTime: '0',
    endTime: '60',
    name: 'Test Bite',
    outputVariable: 'biteResult',
  });

  // Verify output was set
  expect(ctx.outputs['biteResult']).toBeTruthy();
});

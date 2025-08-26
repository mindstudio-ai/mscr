import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('processes audio and saves output to variable', async () => {
  process.env.apiKey = process.env.ELEVENLABS_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    audioFileUrl: 'https://example.com/sample-audio.mp3',
    fileFormat: 'other',
    outputVariable: 'processedAudio',
  });

  expect(ctx.outputs['processedAudio']).toBeTruthy();
});

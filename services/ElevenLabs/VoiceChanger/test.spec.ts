import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('transforms audio and saves output to variable', async () => {
  process.env.apiKey = process.env.ELEVENLABS_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    audioFile: 'https://example.com/sample.mp3',
    voiceId: 'JBFqnCBsd6RMkjVDRZzb',
    modelId: 'eleven_multilingual_sts_v2',
    outputFormat: 'mp3_44100_128',
    removeBackgroundNoise: 'false',
    outputVariable: 'convertedAudio',
  });

  expect(ctx.outputs['convertedAudio']).toBeTruthy();
});

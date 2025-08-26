import { expect, test, vi } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('converts dialogue to speech and saves output to variable', async () => {
  // Set up API key in environment
  process.env.apiKey = process.env.ELEVENLABS_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    dialogueInputs:
      '[{"text":"Hello there!","voiceId":"EXAVITQu4vr4xnSDxMaL"},{"text":"How are you?","voiceId":"21m00Tcm4TlvDq8ikWAM"}]',
    modelId: 'eleven_v3',
    outputFormat: 'mp3_44100_128',
    outputVariable: 'dialogueAudio',
  });

  expect(ctx.outputs['dialogueAudio']).toBeTruthy();
});

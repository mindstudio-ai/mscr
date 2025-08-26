import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates dialogue and saves output to variable', async () => {
  process.env.apiKey = process.env.ELEVENLABS_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    dialogueInputs: [
      { text: 'Hello there', voiceId: 'EXAVITQu4vr4xnSDxMaL' },
      { text: 'Hi, how are you?', voiceId: '21m00Tcm4TlvDq8ikWAM' },
    ],
    modelId: 'eleven_v3',
    outputFormat: 'mp3_44100_128',
    stability: '0.5',
    useSpeakerBoost: 'true',
    outputVariable: 'dialogueAudio',
  });

  expect(ctx.outputs['dialogueAudio']).toBeTruthy();
});

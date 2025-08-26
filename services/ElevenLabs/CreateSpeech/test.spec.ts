import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates speech and saves output URL', async () => {
  process.env.apiKey = process.env.ELEVENLABS_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    voiceId: 'EXAVITQu4vr4xnSDxMaL',
    text: 'This is a test of the ElevenLabs text to speech API.',
    modelId: 'eleven_turbo_v2_5',
    outputVariable: 'speechAudioUrl',
  });

  expect(ctx.outputs['speechAudioUrl']).toBeTruthy();
});

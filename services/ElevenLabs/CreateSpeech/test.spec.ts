// npm test services/ElevenLabs/CreateSpeech
import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('saves output to outVar', async () => {
  process.env.apiKey = process.env.ELEVENLABS_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    voiceId: 'EXAVITQu4vr4xnSDxMaL',
    text: 'Hello',
    modelId: 'eleven_turbo_v2_5',
    outputVariable: 'outVar',
  });

  expect(ctx.outputs['outVar']).toBeTruthy();
});

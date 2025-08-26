import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves voice information', async () => {
  process.env.apiKey = process.env.ELEVENLABS_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    voiceId: '21m00Tcm4TlvDq8ikWAM',
    outputVariable: 'voiceInfo',
  });

  expect(ctx.outputs['voiceInfo']).toBeTruthy();
  expect(ctx.outputs['voiceInfo'].voice_id).toBe('21m00Tcm4TlvDq8ikWAM');
  expect(ctx.outputs['voiceInfo'].name).toBeTruthy();
});

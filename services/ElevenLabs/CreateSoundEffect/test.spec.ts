import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('generates sound effect and saves output to variable', async () => {
  process.env.apiKey = process.env.ELEVENLABS_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    text: 'Spacious braam suitable for high-impact movie trailer moments',
    outputVariable: 'soundEffectUrl',
  });

  expect(ctx.outputs['soundEffectUrl']).toBeTruthy();
});

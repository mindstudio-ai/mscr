import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates video and saves video ID to output variable', async () => {
  process.env.apiKey = process.env.BLOTATO_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    templateId: 'base/pov/wakeup',
    script: 'you wake up as a pharaoh',
    style: 'cinematic',
    captionPosition: 'bottom',
    animateFirstImage: false,
    animateAll: false,
    outputVariable: 'videoId',
  });

  expect(ctx.outputs['videoId']).toBeTruthy();
});

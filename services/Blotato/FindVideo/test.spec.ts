import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves video details and saves to output variable', async () => {
  process.env.apiKey = process.env.BLOTATO_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    videoId: 'test-video-id',
    outputVariable: 'videoDetails',
  });

  expect(ctx.outputs['videoDetails']).toBeTruthy();
});

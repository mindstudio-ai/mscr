import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('analyzes video with VLM and returns structured output', async () => {
  process.env.apiKey = process.env.EYEPOP_API_KEY;
  process.env.accountId = process.env.EYEPOP_ACCOUNT_ID;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    videoUrl: 'https://demo-eyepop-videos.s3.amazonaws.com/test-video-short.mp4',
    textPrompt: 'Describe what is happening in this video',
    workerRelease: 'qwen3-instruct',
    fps: '1',
    maxFrames: '8',
    imageSize: '640',
    outputVariable: 'vlmResult',
  });

  expect(ctx.outputs['vlmResult']).toBeTruthy();
  expect(ctx.outputs['vlmResult'].error).toBeUndefined();
  expect(ctx.outputs['vlmResult'].frames).toBeDefined();
  expect(ctx.outputs['vlmResult'].summary).toBeDefined();
  expect(ctx.outputs['vlmResult'].summary.model).toBe('qwen3-instruct');
}, 120_000);

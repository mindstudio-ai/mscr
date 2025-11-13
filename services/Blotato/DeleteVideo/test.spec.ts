import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes video and returns result', async () => {
  // Mock environment variables
  process.env.apiKey = 'test-api-key';

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    videoId: 'test-video-id',
    outputVariable: 'deleteResult',
  });

  expect(ctx.outputs['deleteResult']).toBeTruthy();
  expect(ctx.outputs['deleteResult'].success).toBe(true);
  expect(ctx.outputs['deleteResult'].id).toBe('test-video-id');
});

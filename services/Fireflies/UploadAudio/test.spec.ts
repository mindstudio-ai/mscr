import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('uploads audio to Fireflies.ai', async () => {
  process.env.apiKey = process.env.FIREFLIES_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    url: 'https://example.com/audio.mp3',
    title: 'Test Meeting',
    custom_language: '',
    save_video: 'false',
    client_reference_id: 'test-123',
    bypass_size_check: 'false',
    outputVariable: 'uploadResult',
  });

  expect(ctx.outputs['uploadResult']).toBeTruthy();
  expect(ctx.outputs['uploadResult'].success).toBeDefined();
});

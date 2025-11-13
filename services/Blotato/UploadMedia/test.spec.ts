import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('uploads media and saves URL to output variable', async () => {
  process.env.apiKey = process.env.BLOTATO_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    mediaUrl: 'https://example.com/image.jpg',
    outputVariable: 'uploadedMediaUrl',
  });

  expect(ctx.outputs['uploadedMediaUrl']).toBeTruthy();
});

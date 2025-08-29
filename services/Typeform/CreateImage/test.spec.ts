import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('uploads image via URL and saves output URL', async () => {
  process.env.token = 'test-token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    uploadMethod: 'url',
    imageUrl: 'https://example.com/test-image.jpg',
    fileName: 'test-image.jpg',
    outputVariable: 'imageUrl',
  });

  expect(ctx.outputs['imageUrl']).toBeTruthy();
});

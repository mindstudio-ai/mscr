import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves image metadata as JSON', async () => {
  process.env.token = 'test-token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    imageId: 'test-image-id',
    imageSize: 'default',
    responseFormat: 'json',
    outputVariable: 'imageData',
  });

  expect(ctx.outputs['imageData']).toBeTruthy();
});

test('retrieves binary image data', async () => {
  process.env.token = 'test-token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    imageId: 'test-image-id',
    imageSize: 'thumbnail',
    responseFormat: 'binary',
    outputVariable: 'imageUrl',
  });

  expect(ctx.outputs['imageUrl']).toBeTruthy();
});

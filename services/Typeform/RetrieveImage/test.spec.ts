import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves image metadata as JSON', async () => {
  process.env.token = process.env.TYPEFORM_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    imageId: 'test-image-id',
    responseFormat: 'json',
    outputVariable: 'imageData',
  });

  expect(ctx.outputs['imageData']).toBeTruthy();
});

test('retrieves binary image and returns URL', async () => {
  process.env.token = process.env.TYPEFORM_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    imageId: 'test-image-id',
    responseFormat: 'binary',
    outputVariable: 'imageUrl',
  });

  expect(ctx.outputs['imageUrl']).toBeTruthy();
});

import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves image metadata as JSON', async () => {
  process.env.token = process.env.TYPEFORM_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    imageId: 'test-image-id',
    imageSize: 'default',
    responseFormat: 'json',
    outputVariable: 'outVar',
  });

  expect(ctx.outputs['outVar']).toBeTruthy();
});

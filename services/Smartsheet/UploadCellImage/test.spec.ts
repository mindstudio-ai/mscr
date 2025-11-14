import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('uploads cell image', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    filePath: '/path/to/image.png',
    outputVariable: 'imageInfo',
  });
  expect(ctx.outputs['imageInfo']).toBeTruthy();
});

import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves images and saves to output variable', async () => {
  process.env.token = 'test-token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outputVariable: 'images',
  });

  expect(ctx.outputs['images']).toBeTruthy();
  expect(Array.isArray(ctx.outputs['images'])).toBe(true);
});

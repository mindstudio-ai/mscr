import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates asset metadata and saves output', async () => {
  process.env.token = process.env.CANVA_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    assetId: 'Msd59349ff',
    name: 'Updated Asset Name',
    tags: 'image, test, updated',
    outputVariable: 'updatedAsset',
  });

  expect(ctx.outputs['updatedAsset']).toBeTruthy();
});

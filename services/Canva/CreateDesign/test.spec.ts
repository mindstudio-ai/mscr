import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a preset design in Canva', async () => {
  process.env.token = process.env.CANVA_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    designTypeOption: 'preset',
    presetName: 'doc',
    title: 'Test Design',
    outputVariable: 'designData',
  });

  expect(ctx.outputs['designData']).toBeTruthy();
  expect(ctx.outputs['designData'].design).toBeDefined();
  expect(ctx.outputs['designData'].design.id).toBeDefined();
});

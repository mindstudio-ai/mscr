import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets export job status', async () => {
  process.env.token = process.env.CANVA_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    exportId: 'test-export-id',
    outputVariable: 'exportResult',
  });

  expect(ctx.outputs['exportResult']).toBeDefined();
});

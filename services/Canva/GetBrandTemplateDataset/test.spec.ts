import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves brand template dataset', async () => {
  process.env.token = process.env.CANVA_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    brandTemplateId: 'sample-template-id',
    outputVariable: 'templateDataset',
  });

  expect(ctx.outputs['templateDataset']).toBeTruthy();
});

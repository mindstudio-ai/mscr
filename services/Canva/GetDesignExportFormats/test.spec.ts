import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves export formats for a design', async () => {
  process.env.token = 'mock-token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    designId: 'mock-design-id',
    outputVariable: 'exportFormats',
  });

  expect(ctx.outputs['exportFormats']).toBeTruthy();
});

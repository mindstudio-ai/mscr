import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates resize job and saves output to variable', async () => {
  process.env.token = 'test-token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    designId: 'DAGirp_1ZUA',
    resizeType: 'custom',
    width: '1000',
    height: '1500',
    outputVariable: 'resizedDesign',
  });

  expect(ctx.outputs['resizedDesign']).toBeTruthy();
  expect(ctx.outputs['resizedDesign'].job).toBeTruthy();
  expect(ctx.outputs['resizedDesign'].job.id).toBeTruthy();
});

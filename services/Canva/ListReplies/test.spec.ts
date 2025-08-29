import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('list replies returns data and saves to output variable', async () => {
  process.env.token = process.env.CANVA_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    designId: 'test-design-id',
    threadId: 'test-thread-id',
    limit: '10',
    outputVariable: 'replies',
  });

  expect(ctx.outputs['replies']).toBeDefined();
});

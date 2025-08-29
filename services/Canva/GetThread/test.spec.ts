import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets thread information', async () => {
  process.env.token = 'test-token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    designId: 'test-design-id',
    threadId: 'test-thread-id',
    outputVariable: 'threadInfo',
  });

  expect(ctx.outputs['threadInfo']).toBeTruthy();
});

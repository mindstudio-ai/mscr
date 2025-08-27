import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('recalculate segment successfully', async () => {
  process.env.apiKey = 'test-api-key';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    publicationId: 'pub_00000000-0000-0000-0000-000000000000',
    segmentId: 'seg_00000000-0000-0000-0000-000000000000',
    outputVariable: 'recalculateResult',
  });

  expect(ctx.outputs['recalculateResult']).toBeTruthy();
});

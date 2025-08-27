import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes segment and sets success variable', async () => {
  process.env.apiKey = process.env.BEEHIIV_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    publicationId: 'pub_00000000-0000-0000-0000-000000000000',
    segmentId: 'seg_00000000-0000-0000-0000-000000000000',
    successVariable: 'success',
  });

  expect(ctx.outputs['success']).toBeDefined();
});

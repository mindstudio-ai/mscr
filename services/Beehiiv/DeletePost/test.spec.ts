import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes a post and saves success message to output variable', async () => {
  process.env.apiKey = process.env.BEEHIIV_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    publicationId: 'pub_00000000-0000-0000-0000-000000000000',
    postId: 'post_00000000-0000-0000-0000-000000000000',
    outputVariable: 'deleteResult',
  });

  expect(ctx.outputs['deleteResult']).toBeTruthy();
});

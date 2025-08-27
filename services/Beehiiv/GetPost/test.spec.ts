import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves post data and saves to output variable', async () => {
  // Set up environment variables
  process.env.apiKey = process.env.BEEHIIV_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    postId: 'post_00000000-0000-0000-0000-000000000000',
    publicationId: 'pub_00000000-0000-0000-0000-000000000000',
    includeStats: 'true',
    includeContent: 'all',
    outputVariable: 'postData',
  });

  // Just verify that the output variable is set
  expect(ctx.outputs['postData']).toBeTruthy();
});

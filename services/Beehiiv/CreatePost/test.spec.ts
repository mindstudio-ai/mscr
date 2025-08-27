import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a post and saves the ID to output variable', async () => {
  // Set up environment variables
  process.env.apiKey = process.env.BEEHIIV_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    publicationId: 'pub_test',
    title: 'Test Post Title',
    subtitle: 'Test Subtitle',
    bodyContent: '<p>Test content</p>',
    status: 'draft',
    outputVariable: 'createdPostId',
  });

  expect(ctx.outputs['createdPostId']).toBeTruthy();
});

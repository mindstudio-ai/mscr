import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves subscription by email', async () => {
  // Set up environment variables
  process.env.apiKey = process.env.BEEHIIV_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    publicationId: 'pub_00000000-0000-0000-0000-000000000000',
    email: 'test@example.com',
    expandFields: 'none',
    outputVariable: 'subscription',
  });

  expect(ctx.outputs['subscription']).toBeTruthy();
});

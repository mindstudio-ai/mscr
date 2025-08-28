import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves list by ID and saves to output variable', async () => {
  // Set up environment variables
  process.env.apiKey = process.env.HEYREACH_API_KEY;

  const { handler } = await import('./handler.ts');

  // Mock list ID (this should be a valid ID in your test environment)
  const ctx = await runConnector(handler, {
    listId: '123',
    outputVariable: 'listDetails',
  });

  // Verify that the output was set
  expect(ctx.outputs['listDetails']).toBeTruthy();
});

import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes interest category successfully', async () => {
  // Set up environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');

  // Mock the inputs that would come from the configuration
  const ctx = await runConnector(handler, {
    listId: 'test-list-id',
    interestCategoryId: 'test-category-id',
  });

  // Verify the success message is returned
  expect(ctx.outputs.success).toBe(true);
  expect(ctx.outputs.message).toBeTruthy();
});

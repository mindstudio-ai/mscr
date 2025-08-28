import { expect, test, vi } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes interest and saves success message to output variable', async () => {
  // Set environment variables
  process.env.apiKey = 'test-api-key';
  process.env.serverPrefix = 'us1';

  // Mock the MailChimp client
  vi.mock('@mailchimp/mailchimp_marketing', () => {
    return {
      default: {
        setConfig: vi.fn(),
        lists: {
          deleteInterestCategoryInterest: vi.fn().mockResolvedValue(undefined),
        },
      },
    };
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: 'test-list-id',
    interestCategoryId: 'test-category-id',
    interestId: 'test-interest-id',
    outputVariable: 'successMessage',
  });

  expect(ctx.outputs['successMessage']).toBeTruthy();
});

import { expect, test, vi } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

// Mock the beehiiv client
vi.mock('beehiiv', () => {
  return {
    BeehiivClient: vi.fn().mockImplementation(() => {
      return {
        subscriptions: {
          delete: vi.fn().mockResolvedValue(undefined),
        },
      };
    }),
  };
});

test('deletes a subscription successfully', async () => {
  process.env.apiKey = 'test-api-key';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    publicationId: 'pub_12345678-1234-1234-1234-123456789012',
    subscriptionId: 'sub_12345678-1234-1234-1234-123456789012',
    confirmation: 'confirmed',
  });

  expect(ctx.logs).toContain('Subscription deleted successfully');
});

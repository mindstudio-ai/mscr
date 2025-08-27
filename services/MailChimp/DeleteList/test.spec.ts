import { expect, test, vi } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('should throw error if deletion is not confirmed', async () => {
  process.env.apiKey = 'test-api-key';
  process.env.serverPrefix = 'us1';

  const { handler } = await import('./handler.ts');

  await expect(
    runConnector(handler, {
      listId: 'abc123def',
      confirmDeletion: 'cancelled',
    }),
  ).rejects.toThrow('Deletion not confirmed');
});

test('should attempt to delete list when confirmed', async () => {
  process.env.apiKey = 'test-api-key';
  process.env.serverPrefix = 'us1';

  // Mock the mailchimp client
  vi.mock('@mailchimp/mailchimp_marketing', () => {
    return {
      default: {
        setConfig: vi.fn(),
        lists: {
          deleteList: vi.fn().mockResolvedValue(undefined),
        },
      },
    };
  });

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    listId: 'abc123def',
    confirmDeletion: 'confirmed',
  });

  expect(ctx.logs).toContain('List successfully deleted');
});

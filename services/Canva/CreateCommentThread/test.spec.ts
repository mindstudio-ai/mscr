import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a comment thread and saves output', async () => {
  // Mock the environment variables
  process.env.token = 'mock-token';

  const { handler } = await import('./handler.ts');

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      thread: {
        id: 'KeAbiEAjZEj',
        design_id: 'DAFVztcvd9z',
        thread_type: {
          type: 'comment',
          content: {
            plaintext: 'Test comment',
            markdown: 'Test comment',
          },
        },
        author: {
          id: 'uKakKUfI03Fg8k2gZ6OkT',
          display_name: 'Test User',
        },
        created_at: 1692928800,
        updated_at: 1692928900,
      },
    }),
  });

  const ctx = await runConnector(handler, {
    designId: 'DAFVztcvd9z',
    messagePlaintext: 'Test comment',
    assigneeId: '',
    outputVariable: 'commentThread',
  });

  expect(ctx.outputs.commentThread).toBeTruthy();
  expect(ctx.outputs.commentThread.thread.id).toBe('KeAbiEAjZEj');
  expect(global.fetch).toHaveBeenCalledTimes(1);
});

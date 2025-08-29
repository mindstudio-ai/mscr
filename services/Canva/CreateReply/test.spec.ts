import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a reply to a comment thread', async () => {
  // Mock the token environment variable
  process.env.token = 'mock-token';

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      reply: {
        id: 'mockReplyId',
        design_id: 'mockDesignId',
        thread_id: 'mockThreadId',
        content: {
          plaintext: 'Test reply',
          markdown: 'Test reply',
        },
        created_at: 1692929800,
        updated_at: 1692929800,
      },
    }),
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    designId: 'mockDesignId',
    threadId: 'mockThreadId',
    message: 'Test reply',
    outputVariable: 'replyData',
  });

  expect(ctx.outputs['replyData']).toBeTruthy();
  expect(ctx.outputs['replyData'].reply.id).toBe('mockReplyId');

  // Verify fetch was called with correct arguments
  expect(fetch).toHaveBeenCalledWith(
    'https://api.canva.com/rest/v1/designs/mockDesignId/comments/mockThreadId/replies',
    expect.objectContaining({
      method: 'POST',
      headers: expect.objectContaining({
        Authorization: 'Bearer mock-token',
        'Content-Type': 'application/json',
      }),
      body: expect.any(String),
    }),
  );
});

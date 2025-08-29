import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets reply and saves to output variable', async () => {
  // Mock the token in environment variables
  process.env.token = 'mock_token';

  const { handler } = await import('./handler.ts');

  // Mock fetch to avoid actual API calls during testing
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      reply: {
        id: 'KeAZEAjijEb',
        design_id: 'DAFVztcvd9z',
        thread_id: 'KeAbiEAjZEj',
        author: {
          id: 'uKakKUfI03Fg8k2gZ6OkT',
          display_name: 'John Doe',
        },
        content: {
          plaintext: 'Test reply',
          markdown: 'Test reply',
        },
        created_at: 1692929800,
        updated_at: 1692929900,
      },
    }),
  });

  const ctx = await runConnector(handler, {
    designId: 'DAFVztcvd9z',
    threadId: 'KeAbiEAjZEj',
    replyId: 'KeAZEAjijEb',
    outputVariable: 'replyData',
  });

  expect(ctx.outputs['replyData']).toBeTruthy();
  expect(ctx.outputs['replyData'].reply.id).toBe('KeAZEAjijEb');
});

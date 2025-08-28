import { expect, test, vi } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('sends message successfully', async () => {
  // Mock environment
  process.env.apiKey = 'test-api-key';

  // Mock fetch to avoid actual API call
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    text: () => Promise.resolve(''),
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    message: 'Hello there',
    subject: 'Test Subject',
    conversationId: '2-ODM0YmIzNzgtOGEyOS00ZTYzLWExYTItNmM0MWNhMjNlNGZj',
    linkedInAccountId: '123',
    successVariable: 'success',
  });

  expect(ctx.outputs.success).toBe(true);
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith(
    'https://api.heyreach.io/api/public/inbox/SendMessage',
    expect.objectContaining({
      method: 'POST',
      headers: expect.objectContaining({
        'X-API-KEY': 'test-api-key',
        'Content-Type': 'application/json',
      }),
    }),
  );
});

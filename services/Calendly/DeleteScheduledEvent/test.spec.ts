import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes a scheduled event', async () => {
  process.env.token = 'mock-token';

  const { handler } = await import('./handler.ts');

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 204,
    statusText: 'No Content',
  });

  const ctx = await runConnector(handler, {
    eventUuid: '01234567-89ab-cdef-0123-456789abcdef',
    reason: 'Testing cancellation',
    outputVariable: 'result',
  });

  expect(ctx.outputs.result).toEqual({
    success: true,
    message: 'Event successfully deleted',
  });

  expect(global.fetch).toHaveBeenCalledWith(
    'https://api.calendly.com/scheduled_events/01234567-89ab-cdef-0123-456789abcdef',
    expect.objectContaining({
      method: 'DELETE',
      headers: expect.objectContaining({
        Authorization: 'Bearer mock-token',
      }),
    }),
  );
});

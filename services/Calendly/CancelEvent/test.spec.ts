import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('successfully cancels an event', async () => {
  // Set up environment variables
  process.env.token = 'test_token';

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 204,
    json: async () => ({}),
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    eventUuid: '01234567-89ab-cdef-0123-456789abcdef',
    reason: 'Testing cancellation',
    outputVariable: 'cancellationResult',
  });

  expect(ctx.outputs['cancellationResult']).toEqual({
    success: true,
    message: 'Event successfully cancelled',
  });

  expect(global.fetch).toHaveBeenCalledWith(
    'https://api.calendly.com/scheduled_events/01234567-89ab-cdef-0123-456789abcdef',
    expect.objectContaining({
      method: 'DELETE',
      headers: expect.objectContaining({
        Authorization: 'Bearer test_token',
      }),
    }),
  );
});

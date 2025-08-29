import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists event type hosts and saves to output variable', async () => {
  // Set up environment variables
  process.env.token = 'mock_token';

  // Mock fetch to avoid actual API calls during testing
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      collection: [
        {
          uri: 'https://api.calendly.com/hosts/ABCDEF123456',
          user: {
            uri: 'https://api.calendly.com/users/ABCDEF123456',
            name: 'Test User',
            email: 'test@example.com',
          },
        },
      ],
    }),
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    eventTypeUuid: '00000000-0000-0000-0000-000000000000',
    outputVariable: 'hosts',
  });

  expect(ctx.outputs['hosts']).toBeTruthy();
  expect(Array.isArray(ctx.outputs['hosts'])).toBe(true);
});

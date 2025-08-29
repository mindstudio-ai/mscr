import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a single-use scheduling link', async () => {
  // Mock the OAuth token
  process.env.token = 'mock_token';

  const { handler } = await import('./handler.ts');

  // Mock fetch to avoid actual API calls during testing
  global.fetch = vi.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          resource: {
            booking_url: 'https://calendly.com/scheduled-event/test-link',
          },
        }),
    }),
  );

  const ctx = await runConnector(handler, {
    eventTypeUrl: 'https://calendly.com/username/30min',
    maxEventCount: '1',
    outputVariable: 'schedulingLink',
  });

  expect(ctx.outputs['schedulingLink']).toBeTruthy();
  expect(global.fetch).toHaveBeenCalled();
});

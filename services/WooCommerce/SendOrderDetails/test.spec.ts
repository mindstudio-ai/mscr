import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('sends order details and saves response to output variable', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'test_consumer_key';
  process.env.consumerSecret = 'test_consumer_secret';

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({ message: 'Order details sent successfully.' }),
  });

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    orderId: '123',
    email: 'test@example.com',
    forceEmailUpdate: 'true',
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeTruthy();
  expect(ctx.outputs['result']).toContain('successfully');
});

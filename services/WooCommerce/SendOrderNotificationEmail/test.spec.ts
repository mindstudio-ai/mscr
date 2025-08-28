import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('sends order notification email', async () => {
  // Set up environment variables
  process.env.url = 'https://example-store.com';
  process.env.consumerKey = 'ck_test_key';
  process.env.consumerSecret = 'cs_test_secret';

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      message:
        'Email template "Completed order" sent to customer@example.com, via REST API.',
    }),
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    orderId: '123',
    templateId: 'customer_completed_order',
    email: 'customer@example.com',
    forceEmailUpdate: 'false',
    outputVariable: 'emailResult',
  });

  expect(ctx.outputs.emailResult).toBeTruthy();
  expect(ctx.outputs.emailResult.success).toBe(true);
  expect(ctx.outputs.emailResult.message).toContain('Email template');
});

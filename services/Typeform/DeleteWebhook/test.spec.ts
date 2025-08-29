import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes webhook and saves success message', async () => {
  // Mock the token environment variable
  process.env.token = 'mock-token';

  // Mock fetch to return a successful response
  global.fetch = vi.fn().mockResolvedValue({
    status: 204,
    ok: true,
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    formId: 'test-form-id',
    webhookTag: 'test-webhook-tag',
    outputVariable: 'resultMessage',
  });

  // Verify the output variable was set
  expect(ctx.outputs['resultMessage']).toBe('Webhook successfully deleted');

  // Verify fetch was called with the correct parameters
  expect(fetch).toHaveBeenCalledWith(
    'https://api.typeform.com/forms/test-form-id/webhooks/test-webhook-tag',
    expect.objectContaining({
      method: 'DELETE',
      headers: expect.objectContaining({
        Authorization: 'Bearer mock-token',
      }),
    }),
  );
});

import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates custom messages for a form', async () => {
  process.env.token = 'test-token';

  const { handler } = await import('./handler.ts');

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    status: 204,
    ok: true,
  });

  const ctx = await runConnector(handler, {
    formId: 'abc123',
    submitButtonText: 'Complete Form',
    successMessage: 'Thank you for your response!',
    requiredFieldError: 'Please fill this field',
  });

  expect(global.fetch).toHaveBeenCalledWith(
    'https://api.typeform.com/forms/abc123/messages',
    expect.objectContaining({
      method: 'PUT',
      headers: expect.objectContaining({
        Authorization: 'Bearer test-token',
      }),
    }),
  );

  expect(ctx.logs[0]).toContain('Successfully updated custom messages');
});

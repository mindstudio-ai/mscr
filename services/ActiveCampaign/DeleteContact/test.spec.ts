import { expect, test, vi } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes a contact successfully', async () => {
  // Set up environment variables
  process.env.accessToken = 'test-token';
  process.env.accountIdentifier = 'https://testaccount.api-us1.com';

  // Mock global fetch
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({}),
  });

  const { handler } = await import('./handler.ts');

  // Run the connector with test inputs
  await runConnector(handler, {
    contactId: '123',
  });

  // Verify fetch was called with the correct parameters
  expect(fetch).toHaveBeenCalledWith(
    'https://testaccount.api-us1.com/api/3/contacts/123',
    expect.objectContaining({
      method: 'DELETE',
      headers: expect.objectContaining({
        'Api-Token': 'test-token',
      }),
    }),
  );
});

import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves organization invitation details', async () => {
  // Set up environment variables
  process.env.token = 'mock_token';

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      resource: {
        uri: 'https://api.calendly.com/organization_invitations/test-uuid',
        email: 'test@example.com',
        status: 'pending',
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z',
      },
    }),
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    invitationUuid: 'test-uuid',
    outputVariable: 'invitationDetails',
  });

  expect(ctx.outputs['invitationDetails']).toBeTruthy();
  expect(global.fetch).toHaveBeenCalledWith(
    'https://api.calendly.com/organization_invitations/test-uuid',
    expect.objectContaining({
      method: 'GET',
      headers: expect.objectContaining({
        Authorization: 'Bearer mock_token',
      }),
    }),
  );
});

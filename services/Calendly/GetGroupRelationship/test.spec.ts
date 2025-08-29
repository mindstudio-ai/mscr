import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves group relationship data', async () => {
  // Set up environment variable for authentication
  process.env.token = 'mock_token';

  const { handler } = await import('./handler.ts');

  // Mock fetch to avoid actual API calls during testing
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      collection: [
        {
          resource: {
            uri: 'https://api.calendly.com/group_memberships/123',
            group: {
              uri: 'https://api.calendly.com/organizations/org123/groups/group123',
            },
            user: {
              uri: 'https://api.calendly.com/users/user123',
            },
            role: 'member',
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
          },
        },
      ],
      pagination: {
        count: 1,
        next_page: null,
      },
    }),
  });

  const ctx = await runConnector(handler, {
    groupUuid: 'group123',
    outputVariable: 'groupRelationshipData',
  });

  expect(ctx.outputs.groupRelationshipData).toBeTruthy();
  expect(global.fetch).toHaveBeenCalledWith(
    expect.stringContaining('https://api.calendly.com/group_memberships'),
    expect.objectContaining({
      method: 'GET',
      headers: expect.objectContaining({
        Authorization: 'Bearer mock_token',
      }),
    }),
  );
});

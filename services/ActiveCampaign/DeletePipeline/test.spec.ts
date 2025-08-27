import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes a pipeline when confirmation is yes', async () => {
  process.env.accessToken = 'test-token';
  process.env.accountIdentifier = 'https://test.api-us1.com';

  // Mock fetch to simulate successful deletion
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({}),
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    pipelineId: '123',
    confirmDelete: 'yes',
  });

  expect(global.fetch).toHaveBeenCalledWith(
    'https://test.api-us1.com/api/3/dealGroups/123',
    expect.objectContaining({
      method: 'DELETE',
      headers: expect.objectContaining({
        'Api-Token': 'test-token',
      }),
    }),
  );
});

test('throws error when confirmation is not yes', async () => {
  const { handler } = await import('./handler.ts');

  await expect(
    runConnector(handler, {
      pipelineId: '123',
      confirmDelete: 'no',
    }),
  ).rejects.toThrow('Pipeline deletion was not confirmed');
});

import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('should handle theme deletion when confirmed', async () => {
  process.env.token = 'test-token';

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    status: 204,
    ok: true,
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    themeId: 'test-theme-id',
    confirmDeletion: 'yes',
  });

  expect(global.fetch).toHaveBeenCalledWith(
    'https://api.typeform.com/themes/test-theme-id',
    expect.objectContaining({
      method: 'DELETE',
      headers: expect.objectContaining({
        Authorization: 'Bearer test-token',
      }),
    }),
  );
});

test('should not delete theme when not confirmed', async () => {
  process.env.token = 'test-token';

  global.fetch = vi.fn();

  const { handler } = await import('./handler.ts');

  await expect(
    runConnector(handler, {
      themeId: 'test-theme-id',
      confirmDeletion: 'no',
    }),
  ).rejects.toThrow('Operation cancelled');

  expect(global.fetch).not.toHaveBeenCalled();
});

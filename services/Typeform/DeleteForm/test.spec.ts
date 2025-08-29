import { expect, test, vi } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

// Mock the fetch function
vi.mock('node-fetch', () => ({
  default: vi.fn(() =>
    Promise.resolve({
      status: 204,
      ok: true,
    }),
  ),
}));

test('successfully deletes a form when confirmation is yes', async () => {
  process.env.token = 'mock-token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    formId: 'abc123',
    confirmDeletion: 'yes',
  });

  expect(ctx.success).toBe(true);
});

test('does not delete a form when confirmation is no', async () => {
  process.env.token = 'mock-token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    formId: 'abc123',
    confirmDeletion: 'no',
  });

  expect(ctx.success).toBe(false);
});

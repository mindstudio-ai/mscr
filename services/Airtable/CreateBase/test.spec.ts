import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a new base and saves output', async () => {
  // Set up environment variables
  process.env.token = 'test-token';

  // Mock fetch to avoid actual API calls
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      id: 'appABC123',
      tables: [
        {
          id: 'tbl123',
          name: 'My Table',
          fields: [{ id: 'fld1', name: 'Name', type: 'singleLineText' }],
        },
      ],
    }),
  });

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    baseName: 'Test Base',
    workspaceId: 'wsTest123',
    tables: [
      {
        name: 'My Table',
        fields: [{ name: 'Name', type: 'singleLineText' }],
      },
    ],
    outputVariable: 'createdBase',
  });

  expect(ctx.outputs.createdBase).toBeTruthy();
  expect(ctx.outputs.createdBase.id).toBe('appABC123');
  expect(global.fetch).toHaveBeenCalledWith(
    'https://api.airtable.com/v0/meta/bases',
    expect.objectContaining({
      method: 'POST',
      headers: expect.objectContaining({
        Authorization: 'Bearer test-token',
      }),
    }),
  );
});

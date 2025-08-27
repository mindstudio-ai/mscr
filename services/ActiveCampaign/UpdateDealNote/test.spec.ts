import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates a deal note', async () => {
  // Set environment variables
  process.env.accessToken = 'test-token';
  process.env.accountIdentifier = 'https://testaccount.api-us1.com';

  // Mock fetch to return a successful response
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      note: {
        id: '123',
        note: 'Updated note content',
        cdate: '2023-01-01T00:00:00-05:00',
        mdate: '2023-01-01T00:00:00-05:00',
      },
    }),
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    dealId: '1',
    noteId: '2',
    noteContent: 'Updated note content',
    outputVariable: 'updatedNote',
  });

  expect(ctx.outputs.updatedNote).toBeTruthy();
  expect(global.fetch).toHaveBeenCalledTimes(1);
});

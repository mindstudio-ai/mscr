import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves design pages and saves to output variable', async () => {
  // Mock the token environment variable
  process.env.token = 'mock-token';

  const { handler } = await import('./handler.ts');

  // Mock fetch to return a successful response
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      items: [
        {
          index: 1,
          thumbnail: {
            width: 595,
            height: 335,
            url: 'https://document-export.canva.com/example/thumbnail.png',
          },
        },
      ],
    }),
  });

  const ctx = await runConnector(handler, {
    designId: 'mock-design-id',
    outputVariable: 'designPages',
  });

  expect(ctx.outputs['designPages']).toBeTruthy();
  expect(ctx.outputs['designPages'].items).toBeInstanceOf(Array);
  expect(global.fetch).toHaveBeenCalledWith(
    expect.stringContaining(
      'https://api.canva.com/rest/v1/designs/mock-design-id/pages',
    ),
    expect.objectContaining({
      headers: expect.objectContaining({
        Authorization: 'Bearer mock-token',
      }),
    }),
  );
});

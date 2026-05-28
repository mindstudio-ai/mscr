import { afterEach, expect, test, vi } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

afterEach(() => {
  vi.unstubAllGlobals();
  delete process.env.token;
});

test('retrieves database information', async () => {
  process.env.token = 'notion-test-token';
  const databaseId = '11111111-1111-1111-1111-111111111111';
  const dataSourceId = '22222222-2222-2222-2222-222222222222';
  const fetchMock = vi.fn(async (url: string, init?: RequestInit) => {
    expect(init?.headers).toMatchObject({
      Authorization: 'Bearer notion-test-token',
      'Notion-Version': '2025-09-03',
    });

    const pathname = new URL(url).pathname;

    if (pathname === `/v1/databases/${databaseId}`) {
      return mockJsonResponse({
        object: 'database',
        id: databaseId,
        data_sources: [{ id: dataSourceId, name: 'Tasks' }],
      });
    }

    if (pathname === `/v1/data_sources/${dataSourceId}`) {
      return mockJsonResponse({
        object: 'data_source',
        id: dataSourceId,
        properties: {
          Name: { title: {} },
        },
      });
    }

    throw new Error(`Unexpected Notion request: ${url}`);
  });
  vi.stubGlobal('fetch', fetchMock);

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    databaseId,
    outputVariable: 'databaseInfo',
  });

  expect(ctx.outputs['databaseInfo']).toBeTruthy();
  expect(ctx.outputs['databaseInfo'].object).toBe('database');
  expect(ctx.outputs['databaseInfo'].id).toBe(databaseId);
  expect(ctx.outputs['databaseInfo'].data_source_details).toHaveLength(1);
  expect(ctx.outputs['databaseInfo'].properties).toEqual({
    Name: { title: {} },
  });
});

function mockJsonResponse(body: unknown): Response {
  return {
    ok: true,
    status: 200,
    statusText: 'OK',
    text: async () => JSON.stringify(body),
  } as Response;
}

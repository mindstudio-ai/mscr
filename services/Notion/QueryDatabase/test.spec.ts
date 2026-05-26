import { afterEach, expect, test, vi } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

afterEach(() => {
  vi.unstubAllGlobals();
  delete process.env.token;
});

test('queries the single data source in a Notion database', async () => {
  process.env.token = 'notion-test-token';
  const databaseId = '11111111-1111-1111-1111-111111111111';
  const dataSourceId = '22222222-2222-2222-2222-222222222222';
  const queryResponse = {
    object: 'list',
    results: [
      {
        object: 'page',
        id: '33333333-3333-3333-3333-333333333333',
      },
    ],
  };
  const fetchMock = vi.fn(async (url: string, init?: RequestInit) => {
    expect(init?.headers).toMatchObject({
      Authorization: 'Bearer notion-test-token',
      'Notion-Version': '2025-09-03',
    });

    const pathname = new URL(url).pathname;

    if (pathname === `/v1/databases/${databaseId}`) {
      return mockJsonResponse({
        data_sources: [{ id: dataSourceId, name: 'Tasks' }],
      });
    }

    if (pathname === `/v1/data_sources/${dataSourceId}/query`) {
      return mockJsonResponse(queryResponse);
    }

    throw new Error(`Unexpected Notion request: ${url}`);
  });
  vi.stubGlobal('fetch', fetchMock);
  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    databaseId,
    pageSize: '10',
    outputVariable: 'queryResults',
  });

  expect(ctx.outputs['queryResults']).toEqual(queryResponse);
  expect(fetchMock).toHaveBeenCalledTimes(2);
});

test('requires a data source selector when a database has multiple data sources', async () => {
  process.env.token = 'notion-test-token';
  const databaseId = '11111111-1111-1111-1111-111111111111';
  const fetchMock = vi.fn(async () =>
    mockJsonResponse({
      data_sources: [
        { id: '22222222-2222-2222-2222-222222222222', name: 'Tasks' },
        { id: '33333333-3333-3333-3333-333333333333', name: 'Projects' },
      ],
    }),
  );
  vi.stubGlobal('fetch', fetchMock);
  const { handler } = await import('./handler.ts');

  await expect(
    runConnector(handler, {
      databaseId,
      outputVariable: 'queryResults',
    }),
  ).rejects.toThrow('multiple data sources');
});

function mockJsonResponse(body: unknown): Response {
  return {
    ok: true,
    status: 200,
    statusText: 'OK',
    text: async () => JSON.stringify(body),
  } as Response;
}

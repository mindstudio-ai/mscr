import { afterEach, expect, test, vi } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

afterEach(() => {
  vi.unstubAllGlobals();
  delete process.env.token;
});

test('creates a page under a resolved Notion data source', async () => {
  process.env.token = 'notion-test-token';
  const databaseId = '11111111-1111-1111-1111-111111111111';
  const dataSourceId = '22222222-2222-2222-2222-222222222222';
  const createdPage = {
    object: 'page',
    id: '33333333-3333-3333-3333-333333333333',
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

    if (pathname === '/v1/pages') {
      expect(JSON.parse(init?.body as string).parent).toEqual({
        type: 'data_source_id',
        data_source_id: dataSourceId,
      });
      return mockJsonResponse(createdPage);
    }

    throw new Error(`Unexpected Notion request: ${url}`);
  });
  vi.stubGlobal('fetch', fetchMock);
  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    parentType: 'database_id',
    parentId: databaseId,
    pageTitle: 'Test Page',
    outputVariable: 'createdPage',
  });

  expect(ctx.outputs['createdPage']).toEqual(createdPage);
  expect(fetchMock).toHaveBeenCalledTimes(2);
});

function mockJsonResponse(body: unknown): Response {
  return {
    ok: true,
    status: 200,
    statusText: 'OK',
    text: async () => JSON.stringify(body),
  } as Response;
}

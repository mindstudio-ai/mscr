import { afterEach, expect, test, vi } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

afterEach(() => {
  vi.unstubAllGlobals();
  delete process.env.token;
});

test('searches Notion and saves results to output variable', async () => {
  process.env.token = 'notion-test-token';
  const searchResponse = {
    object: 'list',
    results: [{ object: 'data_source', id: 'source-id' }],
    has_more: false,
  };
  const fetchMock = vi.fn(async (url: string, init?: RequestInit) => {
    expect(url).toBe('https://api.notion.com/v1/search');
    expect(init?.headers).toMatchObject({
      Authorization: 'Bearer notion-test-token',
      'Notion-Version': '2025-09-03',
    });
    expect(JSON.parse(init?.body as string).filter).toEqual({
      value: 'data_source',
      property: 'object',
    });

    return mockJsonResponse(searchResponse);
  });
  vi.stubGlobal('fetch', fetchMock);

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    query: 'test',
    filterType: 'database',
    sortDirection: 'descending',
    pageSize: '10',
    startCursor: '',
    outputVariable: 'searchResults',
  });

  expect(ctx.outputs['searchResults']).toEqual(searchResponse);
});

function mockJsonResponse(body: unknown): Response {
  return {
    ok: true,
    status: 200,
    statusText: 'OK',
    text: async () => JSON.stringify(body),
  } as Response;
}

import { afterEach, expect, test, vi } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

afterEach(() => {
  vi.unstubAllGlobals();
  delete process.env.token;
});

test('updates Notion database and saves output', async () => {
  process.env.token = 'notion-test-token';
  const databaseId = '11111111-1111-1111-1111-111111111111';
  const dataSourceId = '22222222-2222-2222-2222-222222222222';
  const fetchMock = vi.fn(async (url: string, init?: RequestInit) => {
    expect(init?.headers).toMatchObject({
      Authorization: 'Bearer notion-test-token',
      'Notion-Version': '2025-09-03',
    });

    const pathname = new URL(url).pathname;

    if (
      pathname === `/v1/databases/${databaseId}` &&
      init?.method === 'PATCH'
    ) {
      expect(JSON.parse(init?.body as string).title[0].text.content).toBe(
        'Updated Test Database',
      );
      return mockJsonResponse({
        object: 'database',
        id: databaseId,
        data_sources: [{ id: dataSourceId, name: 'Tasks' }],
      });
    }

    if (pathname === `/v1/databases/${databaseId}` && init?.method === 'GET') {
      return mockJsonResponse({
        object: 'database',
        id: databaseId,
        data_sources: [{ id: dataSourceId, name: 'Tasks' }],
      });
    }

    if (pathname === `/v1/data_sources/${dataSourceId}`) {
      expect(JSON.parse(init?.body as string).properties).toEqual({
        Status: { select: { options: [{ name: 'Done', color: 'green' }] } },
      });
      return mockJsonResponse({
        object: 'data_source',
        id: dataSourceId,
        properties: {
          Status: { select: {} },
        },
      });
    }

    throw new Error(`Unexpected Notion request: ${url}`);
  });
  vi.stubGlobal('fetch', fetchMock);

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    databaseId,
    title: 'Updated Test Database',
    description: 'This is a test description',
    propertiesJson: {
      Status: { select: { options: [{ name: 'Done', color: 'green' }] } },
    },
    outputVariable: 'updatedDatabase',
  });

  expect(ctx.outputs['updatedDatabase']).toBeTruthy();
  expect(ctx.outputs['updatedDatabase'].id).toBe(databaseId);
  expect(ctx.outputs['updatedDatabase'].data_source.id).toBe(dataSourceId);
});

function mockJsonResponse(body: unknown): Response {
  return {
    ok: true,
    status: 200,
    statusText: 'OK',
    text: async () => JSON.stringify(body),
  } as Response;
}

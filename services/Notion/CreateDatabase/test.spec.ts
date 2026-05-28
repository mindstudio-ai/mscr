import { afterEach, expect, test, vi } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

afterEach(() => {
  vi.unstubAllGlobals();
  delete process.env.token;
});

test('creates a Notion database', async () => {
  process.env.token = 'notion-test-token';
  const createdDatabase = {
    object: 'database',
    id: '11111111-1111-1111-1111-111111111111',
    title: [{ text: { content: 'Test Database' } }],
    data_sources: [
      {
        id: '22222222-2222-2222-2222-222222222222',
        name: 'Test Database',
      },
    ],
  };
  const fetchMock = vi.fn(async (url: string, init?: RequestInit) => {
    expect(url).toBe('https://api.notion.com/v1/databases');
    expect(init?.method).toBe('POST');
    expect(init?.headers).toMatchObject({
      Authorization: 'Bearer notion-test-token',
      'Notion-Version': '2025-09-03',
    });
    expect(JSON.parse(init?.body as string)).toMatchObject({
      initial_data_source: {
        properties: {
          Name: { title: {} },
          Notes: { rich_text: {} },
        },
      },
    });

    return mockJsonResponse(createdDatabase);
  });
  vi.stubGlobal('fetch', fetchMock);

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    parentPageId: '98ad959b-2b6a-4774-80ee-00246fb0ea9b',
    databaseTitle: 'Test Database',
    propertiesDefinition: {
      Name: { title: {} },
      Notes: { rich_text: {} },
    },
    iconEmoji: '📝',
    outputVariable: 'createdDatabase',
  });

  expect(ctx.outputs['createdDatabase']).toEqual(createdDatabase);
  expect(ctx.outputs['createdDatabase'].title[0].text.content).toBe(
    'Test Database',
  );
});

function mockJsonResponse(body: unknown): Response {
  return {
    ok: true,
    status: 200,
    statusText: 'OK',
    text: async () => JSON.stringify(body),
  } as Response;
}

import { afterEach, expect, test, vi } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

afterEach(() => {
  vi.unstubAllGlobals();
});

test('searches Google and saves parsed results to the output variable', async () => {
  process.env.apiKey = 'test-api-key';

  // Shape of a recorded live JSON response, shortened
  const results = {
    general: {
      query: 'web scraping',
      results_cnt: 10,
      language: 'en',
      location: 'us',
    },
    organic: [
      {
        link: 'https://example.com/guide',
        source: 'Example',
        display_link: 'https://example.com › guide',
        title: 'Web Scraping Guide',
        description: 'Learn web scraping.',
        icon: 'data:image/png;base64,iVBORw0KGgo=',
        rank: 1,
        global_rank: 1,
      },
    ],
    pagination: { current_page: 2, next_page: 3 },
  };
  const fetchMock = vi.fn().mockResolvedValue(
    new Response(
      JSON.stringify({
        success: true,
        message: 'Successfully scraped',
        data: results,
        tokenUsage: 1,
      }),
      {
        status: 200,
        headers: { 'content-type': 'application/json; charset=utf-8' },
      },
    ),
  );
  vi.stubGlobal('fetch', fetchMock);

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    query: 'web scraping',
    region: 'US',
    language: 'en',
    page: '2',
    outputVariable: 'results',
  });

  expect(ctx.outputs['results']).toEqual(results);
  expect(ctx.outputs['results'].organic[0].link).toBe(
    'https://example.com/guide',
  );

  const [requestUrl, init] = fetchMock.mock.calls[0];
  expect(requestUrl).toBe(
    'https://sync.scraper.mrscraper.com/api/google/serp/v2/sync',
  );
  expect(init.method).toBe('POST');
  expect(init.headers.Authorization).toBe('Bearer test-api-key');
  expect(init.headers['x-api-token']).toBe('test-api-key');
  expect(JSON.parse(init.body)).toEqual({
    query: 'web scraping',
    region: 'us',
    language: 'en',
    page: 2,
    format: 'json',
    renderJs: false,
  });
});

test('returns the results page HTML as text when requested', async () => {
  process.env.apiKey = 'test-api-key';

  // The API wraps the results page HTML in a JSON envelope
  const fetchMock = vi.fn().mockResolvedValue(
    new Response(
      JSON.stringify({
        success: true,
        message: 'Successfully scraped',
        data: { html: '<html>results</html>' },
        tokenUsage: 1,
      }),
      {
        status: 200,
        headers: { 'content-type': 'application/json; charset=utf-8' },
      },
    ),
  );
  vi.stubGlobal('fetch', fetchMock);

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    query: 'web scraping',
    format: 'html',
    renderJs: 'true',
    outputVariable: 'results',
  });

  expect(ctx.outputs['results']).toBe('<html>results</html>');
  expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({
    query: 'web scraping',
    page: 1,
    format: 'html',
    renderJs: true,
  });
});

test('accepts a plain HTML response body', async () => {
  process.env.apiKey = 'test-api-key';
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue(
      new Response('<html>results</html>', {
        status: 200,
        headers: { 'content-type': 'text/html' },
      }),
    ),
  );

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    query: 'web scraping',
    format: 'html',
    outputVariable: 'results',
  });

  expect(ctx.outputs['results']).toBe('<html>results</html>');
});

test('reports an unsuccessful search', async () => {
  process.env.apiKey = 'test-api-key';
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({ success: false, message: 'Search could not run' }),
        {
          status: 200,
          headers: { 'content-type': 'application/json' },
        },
      ),
    ),
  );

  const { handler } = await import('./handler.ts');
  await expect(
    runConnector(handler, { query: 'web scraping', outputVariable: 'results' }),
  ).rejects.toThrow('MrScraper search failed: Search could not run');
});

test('rejects invalid inputs before calling the API', async () => {
  process.env.apiKey = 'test-api-key';
  const fetchMock = vi.fn();
  vi.stubGlobal('fetch', fetchMock);

  const { handler } = await import('./handler.ts');
  await expect(
    runConnector(handler, { query: ' ', outputVariable: 'results' }),
  ).rejects.toThrow('Missing Query');
  await expect(
    runConnector(handler, {
      query: 'web scraping',
      page: '0',
      outputVariable: 'results',
    }),
  ).rejects.toThrow('Page');
  expect(fetchMock).not.toHaveBeenCalled();
});

test('reports an invalid API key', async () => {
  process.env.apiKey = 'test-api-key';
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ message: 'Unauthorized' }), {
        status: 401,
        headers: { 'content-type': 'application/json' },
      }),
    ),
  );

  const { handler } = await import('./handler.ts');
  await expect(
    runConnector(handler, { query: 'web scraping', outputVariable: 'results' }),
  ).rejects.toThrow('Authentication failed');
});

// Live check against the real API; runs only when MRSCRAPER_API_KEY is set.
test.skipIf(!process.env.MRSCRAPER_API_KEY)(
  'searches Google live',
  async () => {
    process.env.apiKey = process.env.MRSCRAPER_API_KEY;

    const { handler } = await import('./handler.ts');
    const ctx = await runConnector(handler, {
      query: 'web scraping',
      region: 'us',
      language: 'en',
      outputVariable: 'results',
    });

    expect(ctx.outputs['results']).toBeTruthy();
    expect(Array.isArray(ctx.outputs['results'].organic)).toBe(true);
  },
  300_000,
);

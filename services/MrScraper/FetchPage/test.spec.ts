import { afterEach, expect, test, vi } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

const mockResponse = (body: unknown, status = 200, targetStatus = '200') =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json',
      'x-status-code': targetStatus,
    },
  });

afterEach(() => {
  vi.unstubAllGlobals();
});

test('fetches a page as Markdown and saves it to the output variable', async () => {
  process.env.apiKey = 'test-api-key';

  const fetchMock = vi.fn().mockResolvedValue(
    mockResponse({
      html: '',
      markdown: '# Example Domain',
      screenshot: null,
      token_usage: 1,
      runtime: 2.5,
      retry_count: 0,
      error: null,
    }),
  );
  vi.stubGlobal('fetch', fetchMock);

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    url: 'https://example.com',
    format: 'markdown',
    outputVariable: 'page',
    detailsVariable: 'details',
  });

  expect(ctx.outputs['page']).toBe('# Example Domain');
  expect(ctx.outputs['details']).toEqual({
    url: 'https://example.com',
    targetStatusCode: 200,
    tokenUsage: 1,
    runtime: 2.5,
    retryCount: 0,
    error: null,
  });

  const [requestUrl, init] = fetchMock.mock.calls[0];
  const sent = new URL(requestUrl);
  expect(sent.origin).toBe('https://api.mrscraper.com');
  expect(sent.searchParams.get('token')).toBe('test-api-key');
  expect(sent.searchParams.get('markdown')).toBe('true');
  expect(sent.searchParams.get('html')).toBe('false');
  expect(sent.searchParams.get('timeout')).toBe('120');
  expect(sent.searchParams.get('geoCode')).toBe('US');
  expect(sent.searchParams.has('browserRendering')).toBe(false);
  expect(sent.searchParams.has('screenshot')).toBe(false);
  expect(init.method).toBe('POST');
  expect(init.headers.Authorization).toBe('Bearer test-api-key');
  expect(init.headers['x-api-token']).toBe('test-api-key');
  expect(JSON.parse(init.body)).toEqual({
    url: 'https://example.com',
    maxRetries: 3,
  });
});

test('sends page-loading options and uploads a screenshot', async () => {
  process.env.apiKey = 'test-api-key';

  const fetchMock = vi.fn().mockResolvedValue(
    mockResponse({
      html: '<html><body>Hello</body></html>',
      markdown: '',
      screenshot: Buffer.from('fake-jpeg').toString('base64'),
      token_usage: 3,
      runtime: 10,
      retry_count: 1,
      error: null,
    }),
  );
  vi.stubGlobal('fetch', fetchMock);

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    url: 'https://example.com/products',
    format: 'html',
    browserRendering: 'false',
    waitForSelector: '.product-list',
    geoCode: 'gb',
    realDevice: 'true',
    homePage: 'true',
    blockResources: 'true',
    targetHeaders: '{"Accept-Language": "en-GB"}',
    timeout: '60',
    maxRetries: '1',
    tokenCap: '10',
    outputVariable: 'page',
    screenshotVariable: 'screenshot',
  });

  expect(ctx.outputs['page']).toBe('<html><body>Hello</body></html>');
  expect(ctx.outputs['screenshot']).toMatch(/^file:\/\/.+\.(jpeg|jpg)$/);

  const [requestUrl, init] = fetchMock.mock.calls[0];
  const sent = new URL(requestUrl);
  expect(sent.searchParams.get('html')).toBe('true');
  expect(sent.searchParams.get('markdown')).toBe('false');
  // A screenshot always forces browser rendering
  expect(sent.searchParams.get('screenshot')).toBe('true');
  expect(sent.searchParams.get('browserRendering')).toBe('true');
  expect(sent.searchParams.get('waitForSelector')).toBe('.product-list');
  expect(sent.searchParams.get('geoCode')).toBe('GB');
  expect(sent.searchParams.get('super')).toBe('true');
  expect(sent.searchParams.get('warmStart')).toBe('true');
  expect(sent.searchParams.get('blockResources')).toBe('true');
  expect(sent.searchParams.get('timeout')).toBe('60');
  expect(JSON.parse(sent.searchParams.get('headers') ?? '')).toEqual({
    'Accept-Language': 'en-GB',
  });
  expect(JSON.parse(init.body)).toEqual({
    url: 'https://example.com/products',
    maxRetries: 1,
    tokenCap: 10,
  });
});

test('reports an invalid API key', async () => {
  process.env.apiKey = 'test-api-key';
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue(mockResponse({ message: 'Unauthorized' }, 401)),
  );

  const { handler } = await import('./handler.ts');
  await expect(
    runConnector(handler, {
      url: 'https://example.com',
      outputVariable: 'page',
    }),
  ).rejects.toThrow('Authentication failed');
});

test('redacts the API key from API error messages', async () => {
  process.env.apiKey = 'test-api-key';
  vi.stubGlobal(
    'fetch',
    vi
      .fn()
      .mockResolvedValue(
        mockResponse({ message: 'Bad request for token=test-api-key' }, 400),
      ),
  );

  const { handler } = await import('./handler.ts');
  const error = await runConnector(handler, {
    url: 'https://example.com',
    outputVariable: 'page',
  }).catch((err: Error) => err);

  expect(error).toBeInstanceOf(Error);
  expect((error as Error).message).toContain('(400)');
  expect((error as Error).message).toContain('[REDACTED]');
  expect((error as Error).message).not.toContain('test-api-key');
});

test('rejects invalid inputs before calling the API', async () => {
  process.env.apiKey = 'test-api-key';
  const fetchMock = vi.fn();
  vi.stubGlobal('fetch', fetchMock);

  const { handler } = await import('./handler.ts');
  await expect(
    runConnector(handler, { url: 'not a url', outputVariable: 'page' }),
  ).rejects.toThrow('Invalid URL');
  await expect(
    runConnector(handler, {
      url: 'https://example.com',
      timeout: '301',
      outputVariable: 'page',
    }),
  ).rejects.toThrow('Timeout');
  await expect(
    runConnector(handler, {
      url: 'https://example.com',
      targetHeaders: '[1, 2]',
      outputVariable: 'page',
    }),
  ).rejects.toThrow('Target Request Headers');
  expect(fetchMock).not.toHaveBeenCalled();
});

// Live check against the real API; runs only when MRSCRAPER_API_KEY is set.
test.skipIf(!process.env.MRSCRAPER_API_KEY)(
  'fetches a live page',
  async () => {
    process.env.apiKey = process.env.MRSCRAPER_API_KEY;

    const { handler } = await import('./handler.ts');
    const ctx = await runConnector(handler, {
      url: 'https://www.scrapethissite.com/pages/simple/',
      format: 'markdown',
      outputVariable: 'page',
    });

    expect(typeof ctx.outputs['page']).toBe('string');
    expect(ctx.outputs['page'].length).toBeGreaterThan(0);
  },
  180_000,
);

import { afterEach, expect, test, vi } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

afterEach(() => {
  vi.unstubAllGlobals();
});

test('saves a usage summary without sensitive account fields', async () => {
  process.env.apiKey = 'test-api-key';

  const fetchMock = vi.fn().mockResolvedValue(
    new Response(
      JSON.stringify({
        message: 'Successful operation!',
        data: {
          id: 'account-id',
          userId: 'user-id',
          stripeStatus: 'active',
          stripeSubscriptionId: 'sub_example',
          isEnterprise: false,
          tokenUsage: 250,
          tokenLimit: 1000,
          rateLimit: 60,
          rateTtl: 60,
          isAutoRenew: true,
          endsAt: '2026-12-01T00:00:00.000Z',
          user: {
            name: 'Example User',
            email: 'user@example.com',
            isVerified: true,
            latestApiToken: 'secret-token-value',
          },
        },
      }),
      { status: 200, headers: { 'content-type': 'application/json' } },
    ),
  );
  vi.stubGlobal('fetch', fetchMock);

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outputVariable: 'account',
  });

  expect(ctx.outputs['account']).toEqual({
    subscriptionStatus: 'active',
    enterprise: false,
    tokenUsage: 250,
    tokenLimit: 1000,
    tokenRemaining: 750,
    usagePercent: 25,
    rateLimit: 60,
    rateTtl: 60,
    autoRenew: true,
    endsAt: '2026-12-01T00:00:00.000Z',
    user: {
      name: 'Example User',
      email: 'user@example.com',
      verified: true,
    },
  });
  expect(JSON.stringify(ctx.outputs['account'])).not.toContain('secret-token');
  expect(JSON.stringify(ctx.outputs['account'])).not.toContain('sub_example');

  const [requestUrl, init] = fetchMock.mock.calls[0];
  expect(requestUrl).toBe(
    'https://api.app.mrscraper.com/api/v1/subscription-accounts',
  );
  expect(init.method).toBe('GET');
  expect(init.headers.Authorization).toBe('Bearer test-api-key');
  expect(init.headers['x-api-token']).toBe('test-api-key');
});

test('clamps remaining tokens at zero', async () => {
  process.env.apiKey = 'test-api-key';
  const body = JSON.stringify({
    stripeStatus: 'active',
    tokenUsage: 1200,
    tokenLimit: 1000,
  });
  const response = new Response(body, {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response));

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, { outputVariable: 'account' });

  expect(ctx.outputs['account'].tokenRemaining).toBe(0);
  expect(ctx.outputs['account'].usagePercent).toBe(120);
});

test('reports an invalid API key', async () => {
  process.env.apiKey = 'test-api-key';
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ message: 'Unauthenticated.' }), {
        status: 401,
        headers: { 'content-type': 'application/json' },
      }),
    ),
  );

  const { handler } = await import('./handler.ts');
  await expect(
    runConnector(handler, { outputVariable: 'account' }),
  ).rejects.toThrow('Authentication failed');
});

// Live check against the real API; runs only when MRSCRAPER_API_KEY is set.
test.skipIf(!process.env.MRSCRAPER_API_KEY)(
  'retrieves the live account status',
  async () => {
    process.env.apiKey = process.env.MRSCRAPER_API_KEY;

    const { handler } = await import('./handler.ts');
    const ctx = await runConnector(handler, { outputVariable: 'account' });

    expect(ctx.outputs['account']).toBeTruthy();
    expect(typeof ctx.outputs['account'].tokenLimit).toBe('number');
  },
  60_000,
);

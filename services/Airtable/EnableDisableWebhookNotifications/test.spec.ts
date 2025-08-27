import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('enables webhook notifications', async () => {
  process.env.token = 'fake_token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    baseId: 'appXXXXXXXXXXXXXX',
    webhookId: 'webXXXXXXXXXXXXXX',
    enable: 'true',
  });

  expect(ctx.logs.length).toBeGreaterThan(0);
});

test('disables webhook notifications', async () => {
  process.env.token = 'fake_token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    baseId: 'appXXXXXXXXXXXXXX',
    webhookId: 'webXXXXXXXXXXXXXX',
    enable: 'false',
  });

  expect(ctx.logs.length).toBeGreaterThan(0);
});

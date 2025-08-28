import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes a shipping zone and saves output to variable', async () => {
  // Set environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  // Mock fetch to avoid actual API call
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      id: 5,
      name: 'Brazil',
      order: 1,
    }),
    status: 200,
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    zoneId: '5',
    force: 'true',
    outputVariable: 'deletedZone',
  });

  expect(ctx.outputs['deletedZone']).toBeTruthy();
  expect(ctx.outputs['deletedZone'].id).toBe(5);
  expect(ctx.outputs['deletedZone'].name).toBe('Brazil');
});

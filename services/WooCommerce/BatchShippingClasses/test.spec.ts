import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('batch shipping classes operations', async () => {
  // Setup environment variables
  process.env.url = 'https://example-store.com';
  process.env.consumerKey = 'ck_test_key';
  process.env.consumerSecret = 'cs_test_secret';

  // Mock fetch to avoid actual API calls during testing
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      create: [{ id: 34, name: 'Small Items' }],
      update: [{ id: 33, name: 'Express', description: 'Updated description' }],
      delete: [{ id: 32, name: 'Priority' }]
    })
  });

  const { handler } = await import('./handler.ts');
  
  const ctx = await runConnector(handler, {
    createClasses: [{ name: 'Small Items' }],
    updateClasses: [{ id: 33, name: 'Express', description: 'Updated description' }],
    deleteClassIds: '32',
    outputVariable: 'result'
  });

  expect(ctx.outputs.result).toBeTruthy();
  expect(global.fetch).toHaveBeenCalledTimes(1);
});
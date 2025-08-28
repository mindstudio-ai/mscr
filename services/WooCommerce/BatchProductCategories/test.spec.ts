import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('batch product categories operations', async () => {
  // Setup environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  // Mock axios to prevent actual API calls
  vi.mock('axios', () => ({
    default: {
      post: vi.fn().mockResolvedValue({
        data: {
          create: [{ id: 15, name: 'Electronics' }],
          update: [{ id: 10, name: 'Updated Name' }],
          delete: [{ id: 11, name: 'Deleted Category' }],
        },
      }),
    },
  }));

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    categoriesToCreate: [{ name: 'Electronics' }],
    categoriesToUpdate: [{ id: 10, name: 'Updated Name' }],
    categoriesToDelete: '11',
    outputVariable: 'result',
  });

  expect(ctx.outputs.result).toBeTruthy();
  expect(ctx.outputs.result.create).toHaveLength(1);
  expect(ctx.outputs.result.update).toHaveLength(1);
  expect(ctx.outputs.result.delete).toHaveLength(1);
});

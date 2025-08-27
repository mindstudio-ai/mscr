import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('fetches base schema and saves to output variable', async () => {
  // Mock environment variables
  process.env.token = 'test_token';

  const { handler } = await import('./handler.ts');

  // Mock fetch to avoid actual API calls during testing
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      tables: [
        {
          id: 'tbl123',
          name: 'Test Table',
          fields: [],
        },
      ],
    }),
  });

  const ctx = await runConnector(handler, {
    baseId: 'app123456789',
    includeVisibleFieldIds: 'false',
    outputVariable: 'baseSchema',
  });

  expect(ctx.outputs['baseSchema']).toBeTruthy();
  expect(ctx.outputs['baseSchema'].tables).toBeInstanceOf(Array);
});

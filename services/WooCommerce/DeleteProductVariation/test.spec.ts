import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes product variation and saves output', async () => {
  // Set environment variables needed for the test
  process.env.url = 'https://example-store.com';
  process.env.consumerKey = 'ck_test_key';
  process.env.consumerSecret = 'cs_test_secret';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    productId: '123',
    variationId: '456',
    forceDelete: 'true',
    outputVariable: 'deletedVariation',
  });

  expect(ctx.outputs['deletedVariation']).toBeTruthy();
});

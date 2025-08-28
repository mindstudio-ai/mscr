import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes a customer and saves output', async () => {
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    customerId: '25',
    forceDelete: 'true',
    reassignPosts: '1',
    outputVariable: 'deletedCustomer',
  });

  expect(ctx.outputs['deletedCustomer']).toBeTruthy();
});

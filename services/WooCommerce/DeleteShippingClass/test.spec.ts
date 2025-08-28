import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes a shipping class and saves output', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test_key';
  process.env.consumerSecret = 'cs_test_secret';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    shippingClassId: '32',
    force: 'true',
    outputVariable: 'deletedShippingClass',
  });

  expect(ctx.outputs['deletedShippingClass']).toBeTruthy();
});

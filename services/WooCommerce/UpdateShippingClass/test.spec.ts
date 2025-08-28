import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates a shipping class and saves output', async () => {
  // Set environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test_key';
  process.env.consumerSecret = 'cs_test_secret';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    shippingClassId: '32',
    description: 'Priority mail shipping option',
    outputVariable: 'updatedShippingClass',
  });

  expect(ctx.outputs['updatedShippingClass']).toBeTruthy();
});

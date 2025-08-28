import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates tax rate and saves output', async () => {
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    taxRateId: '72',
    name: 'Updated Tax Name',
    country: 'US',
    outputVariable: 'updatedTaxRate',
  });

  expect(ctx.outputs['updatedTaxRate']).toBeTruthy();
});

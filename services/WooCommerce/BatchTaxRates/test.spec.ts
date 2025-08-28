import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates tax rates successfully', async () => {
  process.env.url = 'https://example-store.com';
  process.env.consumerKey = 'ck_test_key';
  process.env.consumerSecret = 'cs_test_secret';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    operationType: 'create',
    createTaxRates: [
      {
        country: 'US',
        state: 'AL',
        rate: '4.0000',
        name: 'State Tax',
        shipping: false,
        order: 1,
      },
    ],
    outputVariable: 'taxRatesResult',
  });

  expect(ctx.outputs['taxRatesResult']).toBeTruthy();
});

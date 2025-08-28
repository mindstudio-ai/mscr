import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates product attribute term', async () => {
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    attributeId: '1',
    termId: '23',
    name: 'XXS',
    outputVariable: 'updatedTerm',
  });

  expect(ctx.outputs['updatedTerm']).toBeTruthy();
});

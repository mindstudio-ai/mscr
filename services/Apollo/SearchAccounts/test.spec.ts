import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('searches for accounts and saves output', async () => {
  process.env.apiKey = process.env.APOLLO_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    organizationName: 'test',
    perPage: '5',
    page: '1',
    outputVariable: 'accountResults',
  });

  expect(ctx.outputs['accountResults']).toBeTruthy();
  expect(ctx.outputs['accountResults'].accounts).toBeDefined();
  expect(ctx.outputs['accountResults'].pagination).toBeDefined();
});

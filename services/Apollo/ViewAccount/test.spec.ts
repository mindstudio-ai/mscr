import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves account information', async () => {
  process.env.apiKey = process.env.APOLLO_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    accountId: '6518c6184f20350001a0b9c0',
    outputVariable: 'accountInfo',
  });

  expect(ctx.outputs['accountInfo']).toBeTruthy();
  expect(ctx.outputs['accountInfo'].account).toBeDefined();
});

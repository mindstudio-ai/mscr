import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('enriches organization data', async () => {
  process.env.apiKey = process.env.APOLLO_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    domain: 'apollo.io',
    outputVariable: 'organizationData',
  });

  expect(ctx.outputs['organizationData']).toBeTruthy();
  expect(ctx.outputs['organizationData'].organization).toBeDefined();
});

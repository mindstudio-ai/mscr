import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves organization info', async () => {
  process.env.apiKey = process.env.APOLLO_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    organizationId: '5e66b6381e05b4008c8331b8', // Apollo.io's organization ID
    outputVariable: 'organizationInfo',
  });

  expect(ctx.outputs['organizationInfo']).toBeTruthy();
  expect(ctx.outputs['organizationInfo'].organization).toBeDefined();
});

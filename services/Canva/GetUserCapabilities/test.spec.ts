import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves user capabilities', async () => {
  // Set up mock environment
  process.env.token = process.env.CANVA_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outputVariable: 'capabilities',
  });

  // Verify the output was set
  expect(ctx.outputs['capabilities']).toBeDefined();
  // Capabilities should be an array
  expect(Array.isArray(ctx.outputs['capabilities'])).toBe(true);
});

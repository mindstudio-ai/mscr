import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves design information', async () => {
  // Set up environment
  process.env.token = process.env.CANVA_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    designId: 'DAFVztcvd9z', // Example design ID
    outputVariable: 'designInfo',
  });

  // Verify output was set
  expect(ctx.outputs['designInfo']).toBeTruthy();
});

import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a URL import job in Canva', async () => {
  // Set up environment variables
  process.env.token = process.env.CANVA_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    title: 'Test Design Import',
    url: 'https://example.com/test-file.pdf',
    mimeType: 'application/pdf',
    outputVariable: 'importResult',
  });

  expect(ctx.outputs['importResult']).toBeTruthy();
  expect(ctx.outputs['importResult'].job).toBeDefined();
});

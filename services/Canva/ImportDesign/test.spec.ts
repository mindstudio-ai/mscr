import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('imports design from URL', async () => {
  process.env.token = process.env.CANVA_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    fileUrl: 'https://example.com/sample.pdf',
    designTitle: 'Test Design',
    mimeType: 'application/pdf',
    outputVariable: 'designImport',
  });

  expect(ctx.outputs['designImport']).toBeTruthy();
});

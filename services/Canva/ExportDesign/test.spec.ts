import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates export job and saves output to variable', async () => {
  process.env.accessToken = process.env.CANVA_ACCESS_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    designId: 'DAVZr1z5464',
    formatType: 'pdf',
    exportQuality: 'regular',
    pdfSize: 'a4',
    outputVariable: 'exportUrl',
  });

  expect(ctx.outputs['exportUrl']).toBeTruthy();
});

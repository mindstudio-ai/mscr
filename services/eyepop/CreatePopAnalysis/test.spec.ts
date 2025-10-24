import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('analyzes visual content and saves output to variable', async () => {
  process.env.apiKey = process.env.EYEPOP_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    contentUrl: 'https://example.com/sample-image.jpg',
    contentType: 'image',
    popId: 'test-pop-id',
    outputVariable: 'analysisResult',
  });

  expect(ctx.outputs['analysisResult']).toBeTruthy();
});

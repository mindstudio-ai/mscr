import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('analyzes visual content with composable pop and saves output to variable', async () => {
  process.env.apiKey = process.env.EYEPOP_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    contentUrl: 'https://i.postimg.cc/Sxsmhwpc/IMG-2772.jpg',
    contentType: 'image',
    popConfiguration: JSON.stringify({
      components: [
        {
          type: 'inference',
          model: 'eyepop.person:latest',
        },
      ],
    }),
    outputVariable: 'analysisResult',
  });

  expect(ctx.outputs['analysisResult']).toBeTruthy();
  expect(ctx.outputs['analysisResult'].error).toBeUndefined();
  expect(ctx.outputs['analysisResult'].objects).toBeDefined();
  expect(ctx.outputs['analysisResult'].summary).toBeDefined();
});

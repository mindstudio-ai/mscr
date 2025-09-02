import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('generates presentation and saves output to variable', async () => {
  process.env.apiKey = process.env.GAMMA_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    inputText: 'AI in modern business',
    format: 'presentation',
    themeName: 'Oasis',
    numCards: '5',
    textMode: 'generate',
    cardSplit: 'auto',
    textAmount: 'medium',
    imageSource: 'aiGenerated',
    imageModel: 'flux-1-pro',
    imageStyle: 'photorealistic',
    exportAs: 'pdf',
    outputVariable: 'presentationUrl',
  });

  expect(ctx.outputs['presentationUrl']).toBeTruthy();
});

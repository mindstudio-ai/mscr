import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a theme and saves output', async () => {
  process.env.token = 'test-token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    themeName: 'Test Theme',
    answerColor: '#4FB0AE',
    backgroundColor: '#FFFFFF',
    buttonColor: '#4FB0AE',
    questionColor: '#3D3D3D',
    font: 'Source Sans Pro',
    fieldAlignment: 'left',
    fieldFontSize: 'medium',
    screenAlignment: 'center',
    screenFontSize: 'small',
    transparentButton: 'false',
    roundedCorners: 'small',
    outputVariable: 'themeData',
  });

  expect(ctx.outputs['themeData']).toBeTruthy();
});

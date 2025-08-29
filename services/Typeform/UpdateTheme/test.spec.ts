import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates theme and returns result', async () => {
  process.env.token = 'test-token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(
    handler,
    {
      themeId: '123456',
      name: 'Test Theme',
      answerColor: '#4FB0AE',
      backgroundColor: '#FFFFFF',
      buttonColor: '#4FB0AE',
      questionColor: '#3D3D3D',
      font: 'Source Sans Pro',
      roundedCorners: 'small',
      transparentButton: 'false',
      fieldsAlignment: 'left',
      fieldsFontSize: 'medium',
      screensAlignment: 'center',
      screensFontSize: 'small',
      outputVariable: 'updatedTheme',
    },
    {
      fetch: async () => ({
        ok: true,
        json: async () => ({
          id: '123456',
          name: 'Test Theme',
          visibility: 'private',
        }),
      }),
    },
  );

  expect(ctx.outputs.updatedTheme).toBeTruthy();
  expect(ctx.outputs.updatedTheme.id).toBe('123456');
});

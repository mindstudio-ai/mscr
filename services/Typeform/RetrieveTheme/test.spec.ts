import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves theme information', async () => {
  process.env.token = 'test_token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    themeId: '456',
    outputVariable: 'themeInfo',
  });

  expect(ctx.outputs['themeInfo']).toBeTruthy();
});

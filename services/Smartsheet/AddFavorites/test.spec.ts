import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('adds multiple favorites', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    favoritesJson: '[{"type": "sheet", "objectId": 123}]',
    outputVariable: 'favorites',
  });
  expect(ctx.outputs['favorites']).toBeTruthy();
});

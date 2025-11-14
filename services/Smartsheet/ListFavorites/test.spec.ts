import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists favorites', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outputVariable: 'favorites',
  });
  expect(ctx.outputs['favorites'].favorites).toBeDefined();
});

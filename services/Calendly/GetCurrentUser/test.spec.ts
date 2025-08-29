import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves current user information', async () => {
  process.env.token = process.env.CALENDLY_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outputVariable: 'userInfo',
  });

  expect(ctx.outputs['userInfo']).toBeTruthy();
  expect(ctx.outputs['userInfo'].resource).toBeDefined();
});

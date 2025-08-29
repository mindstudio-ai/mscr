import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves user profile', async () => {
  process.env.token = process.env.CANVA_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outputVariable: 'userProfile',
  });

  expect(ctx.outputs['userProfile']).toBeTruthy();
  expect(ctx.outputs['userProfile']).toHaveProperty('profile');
  expect(ctx.outputs['userProfile'].profile).toHaveProperty('display_name');
});

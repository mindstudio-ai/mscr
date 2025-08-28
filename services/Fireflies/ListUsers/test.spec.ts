import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves users from Fireflies.ai', async () => {
  process.env.apiKey = process.env.FIREFLIES_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    includeUserGroups: 'false',
    outputVariable: 'users',
  });

  expect(ctx.outputs['users']).toBeTruthy();
  expect(Array.isArray(ctx.outputs['users'])).toBe(true);
});

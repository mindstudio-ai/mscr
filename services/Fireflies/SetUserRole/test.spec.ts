import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('sets user role and saves output', async () => {
  process.env.apiKey = process.env.FIREFLIES_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    userId: 'test_user_id',
    role: 'user',
    outputVariable: 'userInfo',
  });

  expect(ctx.outputs['userInfo']).toBeTruthy();
});

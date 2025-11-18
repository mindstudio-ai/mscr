import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('adds alternate email for a user', async () => {
  process.env.accessToken = 'Bearer hM56NiTZB4jgfKXoN7F1ZIr06ndbkNMiI1Qmk';

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    userId: '8378305381459844',
    email: 'test@example.com',
    outputVariable: 'newEmail',
  });

  expect(ctx.outputs['newEmail']).toBeTruthy();
  expect(ctx.outputs['newEmail'].id).toBeDefined();
});

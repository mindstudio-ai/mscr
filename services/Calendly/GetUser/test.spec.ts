import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves user information from Calendly', async () => {
  // Set up mock token
  process.env.token = 'mock_token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outputVariable: 'userInfo',
  });

  // Simply verify that an output was set
  expect(ctx.outputs['userInfo']).toBeTruthy();
});

import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('customizes signup form and saves output', async () => {
  // Set environment variables
  process.env.apiKey = 'test-api-key';
  process.env.serverPrefix = 'us1';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: 'test-list-id',
    headerText: 'Subscribe to our newsletter',
    imageAlign: 'center',
    signupMessage: 'Sign up to receive updates',
    outputVariable: 'signupFormData',
  });

  expect(ctx.outputs['signupFormData']).toBeTruthy();
});

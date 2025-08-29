import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('list event invitees returns data', async () => {
  // Set up environment variables
  process.env.token = 'test_token';

  const { handler } = await import('./handler.ts');

  // Mock event UUID - this would be a real UUID in actual usage
  const ctx = await runConnector(handler, {
    eventUuid: '0123456789abcdef0123456789abcdef',
    count: '25',
    outputVariable: 'invitees',
  });

  expect(ctx.outputs['invitees']).toBeTruthy();
});

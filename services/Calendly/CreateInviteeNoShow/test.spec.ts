import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('marks invitee as no-show', async () => {
  // Set up environment variables
  process.env.token = 'test-token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    inviteeUuid: '12345678-1234-1234-1234-123456789abc',
    outputVariable: 'noShowResult',
  });

  expect(ctx.outputs['noShowResult']).toBeTruthy();
});

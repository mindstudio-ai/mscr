import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('removes user from organization', async () => {
  // Set up mock token
  process.env.token = 'mock_token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    membershipUuid: '12345678-1234-1234-1234-123456789abc',
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeTruthy();
  expect(ctx.outputs['result'].success).toBe(true);
});

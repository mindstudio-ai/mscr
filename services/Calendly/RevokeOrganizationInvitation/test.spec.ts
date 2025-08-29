import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('revokes organization invitation', async () => {
  process.env.token = 'test_token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    invitationUuid: '1234abcd-5678-efgh-9012-ijklmnopqrst',
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeTruthy();
  expect(ctx.outputs['result']).toContain('successfully revoked');
});

import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('successfully deletes webhook subscription', async () => {
  process.env.token = 'test_token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    webhookUuid: '00000000-0000-0000-0000-000000000000',
    successVariable: 'success',
  });

  expect(ctx.outputs['success']).toBe(true);
});

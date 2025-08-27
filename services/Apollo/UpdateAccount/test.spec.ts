import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates an Apollo account', async () => {
  process.env.apiKey = process.env.APOLLO_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    accountId: '66e9abf95ac32901b20d1a0d',
    name: 'Updated Company Name',
    outputVariable: 'updatedAccount',
  });

  expect(ctx.outputs['updatedAccount']).toBeTruthy();
  expect(ctx.outputs['updatedAccount'].account).toBeTruthy();
  expect(ctx.outputs['updatedAccount'].account.id).toBe(
    '66e9abf95ac32901b20d1a0d',
  );
});

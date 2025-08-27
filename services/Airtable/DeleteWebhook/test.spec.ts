import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes webhook and returns success', async () => {
  process.env.token = process.env.AIRTABLE_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    baseId: 'appXXXXXXXXXXXXXX',
    webhookId: 'wnkXXXXXXXXXXXXXX',
    outputVariable: 'success',
  });

  expect(ctx.outputs['success']).toBeDefined();
});

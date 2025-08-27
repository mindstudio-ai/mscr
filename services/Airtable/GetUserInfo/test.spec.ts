import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves user info from Airtable', async () => {
  process.env.token = process.env.AIRTABLE_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    userIdVariable: 'userId',
    emailVariable: 'email',
    scopesVariable: 'scopes',
  });

  expect(ctx.outputs['userId']).toBeTruthy();
});

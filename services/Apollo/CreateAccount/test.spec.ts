import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates an account and saves output to variable', async () => {
  process.env.apiKey = process.env.APOLLO_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    name: 'Test Company',
    domain: 'testcompany.com',
    outputVariable: 'createdAccount',
  });

  expect(ctx.outputs['createdAccount']).toBeTruthy();
});

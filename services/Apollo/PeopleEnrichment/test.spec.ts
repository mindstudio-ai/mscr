import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('enriches person data and saves to output variable', async () => {
  process.env.apiKey = process.env.APOLLO_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    email: 'tim@apollo.io',
    revealPersonalEmails: 'false',
    revealPhoneNumber: 'false',
    outputVariable: 'personData',
  });

  expect(ctx.outputs['personData']).toBeTruthy();
});

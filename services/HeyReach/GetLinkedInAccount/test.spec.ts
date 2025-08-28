import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves LinkedIn account and saves to output variable', async () => {
  process.env.apiKey = process.env.HEYREACH_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    accountId: '123456',
    outputVariable: 'linkedInAccount',
  });

  expect(ctx.outputs['linkedInAccount']).toBeTruthy();
});

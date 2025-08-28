import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves LinkedIn accounts', async () => {
  process.env.apiKey = process.env.HEYREACH_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    keyword: '',
    limit: '10',
    offset: '0',
    outputVariable: 'linkedinAccounts',
  });

  expect(ctx.outputs['linkedinAccounts']).toBeTruthy();
});

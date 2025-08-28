import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves conversations and saves to output variable', async () => {
  process.env.apiKey = process.env.HEYREACH_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    linkedInAccountIds: '',
    campaignIds: '',
    searchString: '',
    leadProfileUrl: '',
    seen: '',
    limit: '10',
    offset: '0',
    outputVariable: 'conversations',
  });

  expect(ctx.outputs['conversations']).toBeTruthy();
});

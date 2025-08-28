import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves campaigns and saves to output variable', async () => {
  process.env.apiKey = process.env.HEYREACH_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    keyword: 'test campaign',
    statuses: 'DRAFT',
    accountIds: '123,456',
    limit: '10',
    offset: '0',
    outputVariable: 'campaigns',
  });

  expect(ctx.outputs['campaigns']).toBeTruthy();
});

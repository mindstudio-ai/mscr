import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves network connections and saves to output variable', async () => {
  process.env.apiKey = process.env.HEYREACH_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    senderId: '1234',
    pageNumber: '0',
    pageSize: '10',
    outputVariable: 'networkConnections',
  });

  expect(ctx.outputs['networkConnections']).toBeTruthy();
});

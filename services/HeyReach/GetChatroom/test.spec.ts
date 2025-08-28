import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves conversation and saves to output variable', async () => {
  process.env.apiKey = process.env.HEYREACH_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    accountId: '12345',
    conversationId: 'abc123',
    outputVariable: 'conversation',
  });

  expect(ctx.outputs['conversation']).toBeTruthy();
});

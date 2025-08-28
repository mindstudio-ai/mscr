import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves leads from list', async () => {
  process.env.apiKey = process.env.HEYREACH_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: '123',
    limit: '10',
    offset: '0',
    outputVariable: 'leads',
  });

  expect(ctx.outputs['leads']).toBeTruthy();
});

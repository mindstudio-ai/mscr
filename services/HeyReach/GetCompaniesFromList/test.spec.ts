import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves companies from list', async () => {
  // Set the API key in the environment
  process.env.apiKey = process.env.HEYREACH_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: '123',
    offset: '0',
    keyword: 'Test',
    limit: '10',
    outputVariable: 'companies',
  });

  expect(ctx.outputs['companies']).toBeDefined();
});

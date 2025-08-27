import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('searches Apollo contacts and saves output', async () => {
  process.env.apiKey = process.env.APOLLO_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    keywords: 'test',
    perPage: '10',
    page: '1',
    outputVariable: 'contactResults',
  });

  expect(ctx.outputs['contactResults']).toBeTruthy();
});

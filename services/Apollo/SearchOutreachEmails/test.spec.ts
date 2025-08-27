import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('searches for outreach emails', async () => {
  process.env.apiKey = process.env.APOLLO_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    emailStatuses: ['delivered'],
    perPage: '10',
    page: '1',
    outputVariable: 'searchResults',
  });

  expect(ctx.outputs['searchResults']).toBeTruthy();
});

import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('searches sequences and saves output', async () => {
  process.env.apiKey = process.env.APOLLO_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sequenceName: 'test',
    page: '1',
    perPage: '5',
    outputVariable: 'sequencesResult',
  });

  expect(ctx.outputs['sequencesResult']).toBeTruthy();
});

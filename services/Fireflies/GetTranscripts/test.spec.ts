import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('fetches transcripts and saves to output variable', async () => {
  // Set up environment variables
  process.env.apiKey = process.env.FIREFLIES_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    keyword: 'test',
    scope: 'title',
    limit: '5',
    includeDetails: 'true',
    includeSentences: 'false',
    includeSummary: 'false',
    includeAnalytics: 'false',
    outputVariable: 'transcripts',
  });

  expect(ctx.outputs['transcripts']).toBeTruthy();
});

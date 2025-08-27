import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves job postings and saves to output variable', async () => {
  process.env.apiKey = process.env.APOLLO_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    organizationId: '5e66b6381e05b4008c8331b8', // Example organization ID
    perPage: '10',
    page: '1',
    outputVariable: 'jobPostings',
  });

  expect(ctx.outputs['jobPostings']).toBeTruthy();
});

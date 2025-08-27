import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves deal information and saves to output variable', async () => {
  // Set up environment variables
  process.env.apiKey = process.env.APOLLO_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    opportunityId: '66e09ea8e3cfcf01b2208ec7', // Sample deal ID
    outputVariable: 'dealInfo',
  });

  expect(ctx.outputs['dealInfo']).toBeTruthy();
  expect(ctx.outputs['dealInfo'].id).toBe('66e09ea8e3cfcf01b2208ec7');
});

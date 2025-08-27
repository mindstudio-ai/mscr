import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates a deal and returns the result', async () => {
  // Set up environment
  process.env.apiKey = process.env.APOLLO_API_KEY;

  const { handler } = await import('./handler.ts');

  // Mock a minimal set of inputs
  const ctx = await runConnector(handler, {
    opportunityId:
      process.env.TEST_OPPORTUNITY_ID || '66e09ea8e3cfcf01b2208ec7',
    name: 'Updated Test Deal',
    outputVariable: 'updatedDeal',
  });

  // Just verify we get some output
  expect(ctx.outputs['updatedDeal']).toBeTruthy();
  expect(ctx.outputs['updatedDeal'].opportunity).toBeDefined();
});

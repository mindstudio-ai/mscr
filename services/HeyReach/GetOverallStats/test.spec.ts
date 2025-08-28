import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves HeyReach stats and saves to output variable', async () => {
  // Set the API key in the environment
  process.env.apiKey = process.env.HEYREACH_API_KEY;

  const { handler } = await import('./handler.ts');

  // Run the connector with test inputs
  const ctx = await runConnector(handler, {
    startDate: '2023-01-01',
    endDate: '2023-01-07',
    accountIds: '1234',
    campaignIds: '',
    outputVariable: 'statsResult',
  });

  // Verify that the output was set
  expect(ctx.outputs['statsResult']).toBeTruthy();
  expect(ctx.outputs['statsResult']).toHaveProperty('overallStats');
  expect(ctx.outputs['statsResult']).toHaveProperty('byDayStats');
});

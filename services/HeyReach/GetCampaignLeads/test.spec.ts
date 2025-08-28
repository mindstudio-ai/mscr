import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves campaign leads and saves to output variable', async () => {
  // Set environment variables
  process.env.apiKey = process.env.HEYREACH_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    campaignId: '1805',
    offset: '0',
    limit: '10',
    timeFilter: 'Everywhere',
    outputVariable: 'campaignLeads',
  });

  expect(ctx.outputs['campaignLeads']).toBeTruthy();
});

test('validates required fields when time filter is CreationTime', async () => {
  process.env.apiKey = process.env.HEYREACH_API_KEY;

  const { handler } = await import('./handler.ts');

  await expect(
    runConnector(handler, {
      campaignId: '1805',
      offset: '0',
      limit: '10',
      timeFilter: 'CreationTime',
      outputVariable: 'campaignLeads',
    }),
  ).rejects.toThrow(/timeFrom.*timeTo/);
});

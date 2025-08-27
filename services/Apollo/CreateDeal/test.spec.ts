import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a deal in Apollo', async () => {
  process.env.apiKey = process.env.APOLLO_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    dealName: 'Test Deal',
    amount: '10000',
    accountId: '5e66b6381e05b4008c8331b8',
    ownerId: '66302798d03b9601c7934ebf',
    opportunityStageId: '6095a710bd01d100a506d4bd',
    closedDate: '2024-12-31',
    outputVariable: 'dealInfo',
  });

  expect(ctx.outputs['dealInfo']).toBeTruthy();
});

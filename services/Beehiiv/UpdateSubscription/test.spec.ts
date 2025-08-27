import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates subscription and saves output', async () => {
  process.env.apiKey = process.env.BEEHIIV_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    publicationId: 'pub_00000000-0000-0000-0000-000000000000',
    subscriptionId: 'sub_00000000-0000-0000-0000-000000000000',
    tier: 'free',
    outputVariable: 'updatedSubscription',
  });

  expect(ctx.outputs['updatedSubscription']).toBeTruthy();
});

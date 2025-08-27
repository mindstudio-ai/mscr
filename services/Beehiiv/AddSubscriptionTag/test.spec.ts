import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('adds tags to a subscription', async () => {
  process.env.apiKey = process.env.BEEHIIV_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    publicationId: 'pub_12345678-1234-1234-1234-123456789012',
    subscriptionId: 'sub_12345678-1234-1234-1234-123456789012',
    tags: 'Premium, Active, Engaged',
    outputVariable: 'updatedSubscription',
  });

  expect(ctx.outputs['updatedSubscription']).toBeTruthy();
});

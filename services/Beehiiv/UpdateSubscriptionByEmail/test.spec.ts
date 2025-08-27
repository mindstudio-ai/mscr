import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates a subscription by email', async () => {
  process.env.apiKey = process.env.BEEHIIV_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    publicationId: 'pub_00000000-0000-0000-0000-000000000000',
    email: 'test@example.com',
    tier: 'premium',
    stripeCustomerId: 'cus_12345abcde',
    unsubscribe: false,
    customFields: [
      { name: 'First Name', value: 'John' },
      { name: 'Last Name', value: 'Doe' },
    ],
    outputVariable: 'updatedSubscription',
  });

  expect(ctx.outputs['updatedSubscription']).toBeTruthy();
});

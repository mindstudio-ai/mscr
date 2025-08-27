import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a subscription and saves output', async () => {
  process.env.apiKey = process.env.BEEHIIV_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    publicationId: 'pub_00000000-0000-0000-0000-000000000000',
    email: 'test@example.com',
    reactivateExisting: 'false',
    sendWelcomeEmail: 'false',
    outputVariable: 'subscription',
    customFields: '[{"name": "First Name", "value": "Test"}]',
  });

  expect(ctx.outputs['subscription']).toBeTruthy();
});

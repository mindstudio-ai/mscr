import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists webhooks from Airtable base', async () => {
  // Set up environment variables
  process.env.token = process.env.AIRTABLE_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    baseId: process.env.AIRTABLE_BASE_ID || 'appXXXXXXXXXXXXXX',
    outputVariable: 'webhooksList',
  });

  // Verify that the output variable was set
  expect(ctx.outputs['webhooksList']).toBeDefined();
});

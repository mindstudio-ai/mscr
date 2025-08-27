import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('adds subscription to automation', async () => {
  process.env.apiKey = process.env.BEEHIIV_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    publicationId: 'pub_12345678-1234-1234-1234-123456789012',
    automationId: 'aut_12345678-1234-1234-1234-123456789012',
    email: 'test@example.com',
    outputVariable: 'journeyDetails',
  });

  expect(ctx.outputs['journeyDetails']).toBeTruthy();
});

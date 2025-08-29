import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves calendly events', async () => {
  // Set up environment variables
  process.env.token = process.env.CALENDLY_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    minStartTime: '2023-01-01T00:00:00Z',
    maxStartTime: '2023-12-31T23:59:59Z',
    status: 'active',
    count: '10',
    outputVariable: 'events',
  });

  expect(ctx.outputs['events']).toBeTruthy();
  expect(Array.isArray(ctx.outputs['events'])).toBe(true);
});

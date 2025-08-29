import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves available times for event type', async () => {
  // Set up environment variables
  process.env.token = 'test_token';

  const { handler } = await import('./handler.ts');

  // Mock date values for testing
  const startTime = new Date();
  const endTime = new Date();
  endTime.setDate(endTime.getDate() + 7); // One week from now

  const ctx = await runConnector(handler, {
    eventTypeUuid: '00000000-0000-0000-0000-000000000000',
    startTime: startTime.toISOString(),
    endTime: endTime.toISOString(),
    outputVariable: 'availableTimes',
  });

  expect(ctx.outputs['availableTimes']).toBeDefined();
});

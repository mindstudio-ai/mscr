import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves availability schedules for an event type', async () => {
  // Set up mock environment variables
  process.env.token = process.env.CALENDLY_TOKEN;

  const { handler } = await import('./handler.ts');

  // Run the connector with test inputs
  const ctx = await runConnector(handler, {
    eventTypeUuid:
      process.env.CALENDLY_TEST_EVENT_TYPE_UUID ||
      '267c5d10-9940-4f10-8f8a-d5fc332b2d6f',
    count: '25',
    outputVariable: 'availabilitySchedules',
  });

  // Verify the output was set
  expect(ctx.outputs['availabilitySchedules']).toBeTruthy();
  expect(ctx.outputs['availabilitySchedules'].collection).toBeDefined();
});

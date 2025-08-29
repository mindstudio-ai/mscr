import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves user availability schedule', async () => {
  // Set up environment variables
  process.env.token = 'test_token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    scheduleId: 'test_schedule_id',
    outputVariable: 'availabilitySchedule',
  });

  expect(ctx.outputs['availabilitySchedule']).toBeTruthy();
});

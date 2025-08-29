import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates event type availability and saves output', async () => {
  process.env.token = 'mock_token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    eventTypeUuid: '00000000-0000-0000-0000-000000000000',
    availabilityRules: [
      {
        type: 'wday',
        days: [1, 2, 3, 4, 5],
        intervals: [{ from: '09:00', to: '17:00' }],
      },
    ],
    outputVariable: 'updatedEventType',
  });

  expect(ctx.outputs['updatedEventType']).toBeDefined();
});

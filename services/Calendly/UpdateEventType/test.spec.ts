import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates event type and saves output to outVar', async () => {
  process.env.token = process.env.CALENDLY_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    eventTypeUuid: 'test-event-type-uuid',
    name: 'Updated Event Name',
    description: 'Updated event description',
    outputVariable: 'outVar',
  });

  expect(ctx.outputs['outVar']).toBeTruthy();
});

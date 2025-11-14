import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets event', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    eventId: 'test-event-id',
    outputVariable: 'event',
  });
  expect(ctx.outputs['event']).toBeTruthy();
});

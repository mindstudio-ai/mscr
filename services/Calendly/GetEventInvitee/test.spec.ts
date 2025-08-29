import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves invitee information', async () => {
  process.env.token = 'mock-token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    eventUuid: 'mock-event-uuid',
    inviteeUuid: 'mock-invitee-uuid',
    outputVariable: 'inviteeInfo',
  });

  expect(ctx.outputs['inviteeInfo']).toBeTruthy();
});

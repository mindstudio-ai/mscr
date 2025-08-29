import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes invitee data successfully', async () => {
  process.env.token = 'test_token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    eventUuid: 'test-event-uuid',
    inviteeUuid: 'test-invitee-uuid',
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toEqual({
    success: true,
    message: 'Invitee data successfully deleted',
  });
});

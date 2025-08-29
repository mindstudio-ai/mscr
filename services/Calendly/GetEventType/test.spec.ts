import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves event type details', async () => {
  process.env.token = 'mock_token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    eventTypeUuid: '01234567-89ab-cdef-0123-456789abcdef',
    outputVariable: 'eventTypeDetails',
  });

  expect(ctx.outputs['eventTypeDetails']).toBeTruthy();
});

import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves Calendly event details', async () => {
  process.env.token = process.env.CALENDLY_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    eventUuid: '01234567-89ab-cdef-0123-456789abcdef',
    outputVariable: 'eventDetails',
  });

  expect(ctx.outputs['eventDetails']).toBeTruthy();
});

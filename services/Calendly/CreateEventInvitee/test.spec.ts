import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates event invitee and saves output', async () => {
  // Set environment variables
  process.env.token = process.env.CALENDLY_TOKEN;

  const { handler } = await import('./handler.ts');

  // Mock inputs for the test
  const ctx = await runConnector(handler, {
    eventTypeUri: 'https://api.calendly.com/event_types/AAAAAAAAAAAAAAAA',
    startTime: '2023-08-07T06:05:04Z',
    inviteeName: 'Test User',
    inviteeEmail: 'test@example.com',
    inviteeTimezone: 'America/New_York',
    outputVariable: 'inviteeData',
  });

  // Check if output was set
  expect(ctx.outputs['inviteeData']).toBeTruthy();
});

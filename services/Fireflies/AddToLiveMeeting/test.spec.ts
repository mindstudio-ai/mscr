import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('adds Fireflies bot to a live meeting', async () => {
  process.env.apiKey = process.env.FIREFLIES_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    meetingLink: 'https://meet.google.com/test-meeting',
    title: 'Test Meeting',
    outputVariable: 'success',
  });

  expect(ctx.outputs['success']).toBeDefined();
});

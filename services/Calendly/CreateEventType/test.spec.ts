import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a Calendly event type and saves output', async () => {
  // Mock token for testing
  process.env.token = 'mock_token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    name: 'Test Event Type',
    description: 'This is a test event type',
    color: '#0088cc',
    duration: '30',
    slug: 'test-event',
    kind: 'solo',
    profileId: 'PROFILE123',
    outputVariable: 'eventTypeData',
  });

  expect(ctx.outputs['eventTypeData']).toBeTruthy();
});

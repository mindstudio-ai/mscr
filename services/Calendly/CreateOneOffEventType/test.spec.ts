import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a one-off event type in Calendly', async () => {
  process.env.token = 'test_token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    name: 'Test Meeting',
    description: 'A test meeting description',
    color: '#3498db',
    duration: '30',
    slug: 'test-meeting',
    kind: 'solo',
    locationType: 'link',
    customLocation: 'https://example.com/meeting',
    profileId: 'test-profile-id',
    outputVariable: 'eventType',
  });

  expect(ctx.outputs['eventType']).toBeTruthy();
});

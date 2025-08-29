import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves user meeting locations', async () => {
  // Set up the environment variable for authentication
  process.env.token = 'mock_token';

  const { handler } = await import('./handler.ts');

  // Mock user UUID
  const ctx = await runConnector(handler, {
    userUuid: 'test-user-uuid',
    outputVariable: 'meetingLocations',
  });

  // Verify that the output was set
  expect(ctx.outputs['meetingLocations']).toBeDefined();
});

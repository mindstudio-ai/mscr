import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves analytics data from Fireflies.ai', async () => {
  process.env.apiKey = process.env.FIREFLIES_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    startTime: '2024-01-01T00:00:00Z',
    endTime: '2024-01-31T23:59:59Z',
    analyticsLevel: 'team',
    includeTeamConversation: 'basic',
    includeTeamMeeting: 'basic',
    includeUserConversation: 'none',
    includeUserMeeting: 'none',
    outputVariable: 'analyticsData',
  });

  expect(ctx.outputs['analyticsData']).toBeTruthy();
});

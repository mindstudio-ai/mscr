import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a share link and saves to output variable', async () => {
  // Mock the token environment variable
  process.env.token = 'mock_token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    eventTypeLink: 'https://calendly.com/username/30min',
    maxEventCount: '5',
    outputVariable: 'shareLink',
  });

  expect(ctx.outputs['shareLink']).toBeTruthy();
});

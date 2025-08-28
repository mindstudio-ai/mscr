import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves lead information from HeyReach API', async () => {
  // Set environment variables for the test
  process.env.apiKey = process.env.HEYREACH_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    profileUrl: 'https://www.linkedin.com/in/john_doe/',
    outputVariable: 'leadInfo',
  });

  // Verify the output was set
  expect(ctx.outputs['leadInfo']).toBeTruthy();
});

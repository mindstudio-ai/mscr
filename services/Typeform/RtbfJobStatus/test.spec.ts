import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves RTBF job status', async () => {
  process.env.token = 'mock-token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    accountId: '01D9W9DZ93G5Y9CSK6ADHP79B1',
    jobId: 'job_12345',
    outputVariable: 'jobStatus',
  });

  expect(ctx.outputs['jobStatus']).toBeDefined();
});

import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves design autofill job status', async () => {
  // Set up mock environment
  process.env.token = 'mock-token';

  const { handler } = await import('./handler.ts');

  // Mock fetch to avoid actual API calls in tests
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      job: {
        id: 'mock-job-id',
        status: 'in_progress',
      },
    }),
  });

  const ctx = await runConnector(handler, {
    jobId: 'mock-job-id',
    outputVariable: 'jobResult',
  });

  expect(ctx.outputs['jobResult']).toBeTruthy();
  expect(ctx.outputs['jobResult'].job.id).toBe('mock-job-id');
  expect(ctx.outputs['jobResult'].job.status).toBe('in_progress');
});

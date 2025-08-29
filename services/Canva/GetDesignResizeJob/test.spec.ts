import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves design resize job details', async () => {
  // Mock token for testing
  process.env.token = 'test_token';

  const { handler } = await import('./handler.ts');

  // Mock fetch to avoid actual API call
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      job: {
        id: 'test-job-id',
        status: 'success',
        result: {
          design: {
            id: 'DAGirp_1ZUA',
            title: 'Test Design',
          },
        },
      },
    }),
  });

  const ctx = await runConnector(handler, {
    jobId: 'test-job-id',
    outputVariable: 'jobResult',
  });

  expect(ctx.outputs['jobResult']).toBeTruthy();
  expect(ctx.outputs['jobResult'].job.id).toBe('test-job-id');
});

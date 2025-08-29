import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('saves output to outVar', async () => {
  // Mock the environment variables
  process.env.token = 'mock_token';

  // Mock fetch to return a successful response
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      job: {
        id: 'mock-job-id',
        status: 'success',
        result: {
          designs: [
            {
              id: 'DAGQm2AkzOk',
              title: 'Test Design',
              urls: {
                edit_url: 'https://www.canva.com/api/design/edit',
                view_url: 'https://www.canva.com/api/design/view',
              },
            },
          ],
        },
      },
    }),
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    jobId: 'mock-job-id',
    outputVariable: 'outVar',
  });

  expect(ctx.outputs['outVar']).toBeTruthy();
  expect(ctx.outputs['outVar'].job.status).toBe('success');
});

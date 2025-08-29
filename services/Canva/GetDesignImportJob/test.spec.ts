import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('saves output to outVar', async () => {
  // Mock the token environment variable
  process.env.token = 'mock-token';

  const { handler } = await import('./handler.ts');

  // Mock fetch to return a successful response
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      job: {
        id: 'test-job-id',
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
              created_at: 1726198998,
              updated_at: 1726199000,
            },
          ],
        },
      },
    }),
  });

  const ctx = await runConnector(handler, {
    jobId: 'test-job-id',
    outputVariable: 'outVar',
  });

  expect(ctx.outputs['outVar']).toBeTruthy();
  expect(ctx.outputs['outVar'].job.status).toBe('success');
  expect(global.fetch).toHaveBeenCalledWith(
    'https://api.canva.com/rest/v1/imports/test-job-id',
    expect.objectContaining({
      method: 'GET',
      headers: expect.objectContaining({
        Authorization: 'Bearer mock-token',
      }),
    }),
  );
});

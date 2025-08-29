import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates url import job and saves output', async () => {
  // Set up environment variables
  process.env.token = 'test-token';

  const { handler } = await import('./handler.ts');

  // Mock fetch to avoid actual API calls during tests
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      job: {
        id: 'test-job-id',
        status: 'in_progress',
      },
    }),
  });

  const ctx = await runConnector(handler, {
    title: 'Test Design',
    url: 'https://example.com/test.pptx',
    mimeType:
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    outputVariable: 'importJobResult',
  });

  expect(ctx.outputs.importJobResult).toBeTruthy();
  expect(ctx.outputs.importJobResult.job.id).toBe('test-job-id');
  expect(ctx.outputs.importJobResult.job.status).toBe('in_progress');

  // Verify the correct API was called with proper parameters
  expect(global.fetch).toHaveBeenCalledWith(
    'https://api.canva.com/rest/v1/url-imports',
    expect.objectContaining({
      method: 'POST',
      headers: expect.objectContaining({
        Authorization: 'Bearer test-token',
        'Content-Type': 'application/json',
      }),
    }),
  );
});

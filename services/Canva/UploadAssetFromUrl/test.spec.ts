import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('uploads asset from URL and saves job details to output variable', async () => {
  // Mock environment variables
  process.env.token = 'mock-token';

  const { handler } = await import('./handler.ts');

  // Mock fetch to avoid actual API calls during testing
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
    assetName: 'Test Asset',
    assetUrl: 'https://example.com/test-image.jpg',
    outputVariable: 'assetJob',
  });

  // Verify output was set correctly
  expect(ctx.outputs['assetJob']).toBeTruthy();
  expect(ctx.outputs['assetJob'].job.id).toBe('mock-job-id');
  expect(ctx.outputs['assetJob'].job.status).toBe('in_progress');
});

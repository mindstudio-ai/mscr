import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates design autofill job', async () => {
  process.env.token = 'test-token';

  const { handler } = await import('./handler.ts');

  // Mock fetch to avoid actual API calls during testing
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
    brandTemplateId: 'DAFVztcvd9z',
    title: 'Test Design',
    textFields: { headline: 'Welcome to our event' },
    imageFields: { hero_image: 'Msd59349ff' },
    jobIdOutput: 'jobId',
  });

  expect(ctx.outputs.jobId).toBe('test-job-id');
  expect(global.fetch).toHaveBeenCalledWith(
    'https://api.canva.com/rest/v1/autofills',
    expect.objectContaining({
      method: 'POST',
      headers: expect.objectContaining({
        Authorization: 'Bearer test-token',
        'Content-Type': 'application/json',
      }),
    }),
  );
});

import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves routing form submission', async () => {
  // Mock the token environment variable
  process.env.token = 'mock_token';

  // Mock fetch to return a successful response
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      resource: {
        uri: 'https://api.calendly.com/routing_form_submissions/test-uuid',
        routing_form_id: 'test-form-id',
        status: 'submitted',
        questions_and_answers: [],
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z',
      },
    }),
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    submissionUuid: 'test-uuid',
    outputVariable: 'submissionData',
  });

  expect(ctx.outputs['submissionData']).toBeTruthy();
  expect(global.fetch).toHaveBeenCalledWith(
    'https://api.calendly.com/routing_form_submissions/test-uuid',
    expect.objectContaining({
      method: 'GET',
      headers: expect.objectContaining({
        Authorization: 'Bearer mock_token',
      }),
    }),
  );
});

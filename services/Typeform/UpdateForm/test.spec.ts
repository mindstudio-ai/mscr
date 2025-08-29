import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates a typeform form', async () => {
  process.env.token = 'mock-token';

  const { handler } = await import('./handler.ts');

  // Mock form definition
  const mockFormDefinition = {
    title: 'Updated Test Form',
    fields: [
      {
        title: 'What is your name?',
        type: 'short_text',
        ref: 'name',
      },
    ],
  };

  // Mock the global fetch function
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ id: 'abc123', title: 'Updated Test Form' }),
  });

  const ctx = await runConnector(handler, {
    formId: 'abc123',
    formDefinition: mockFormDefinition,
    outputVariable: 'updatedForm',
  });

  expect(ctx.outputs.updatedForm).toBeTruthy();
  expect(global.fetch).toHaveBeenCalledWith(
    'https://api.typeform.com/forms/abc123',
    expect.objectContaining({
      method: 'PUT',
      headers: expect.objectContaining({
        Authorization: 'Bearer mock-token',
      }),
    }),
  );
});

import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('downloads file and saves output to variable', async () => {
  process.env.token = 'test-token';

  const { handler } = await import('./handler.ts');

  // Mock the fetch response
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    blob: () =>
      Promise.resolve(
        new Blob(['test file content'], { type: 'application/pdf' }),
      ),
    headers: new Headers({ 'content-type': 'application/pdf' }),
  });

  const ctx = await runConnector(handler, {
    formId: 'test-form',
    responseId: 'test-response',
    fieldId: 'test-field',
    filename: 'test.pdf',
    inline: 'false',
    outputVariable: 'fileUrl',
  });

  expect(ctx.outputs['fileUrl']).toBeTruthy();
  expect(global.fetch).toHaveBeenCalledWith(
    'https://api.typeform.com/forms/test-form/responses/test-response/fields/test-field/files/test.pdf?inline=false',
    expect.objectContaining({
      method: 'GET',
      headers: expect.objectContaining({
        Authorization: 'Bearer test-token',
      }),
    }),
  );
});

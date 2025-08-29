import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates form translation successfully', async () => {
  process.env.token = 'test-token';

  // Mock fetch to avoid actual API calls during testing
  global.fetch = vi.fn().mockResolvedValue({
    status: 204,
    ok: true,
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    formId: 'abc123',
    language: 'es',
    translationJson: JSON.stringify({
      messages: {
        'label.button.submit': 'Enviar',
      },
    }),
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toEqual({ success: true });
  expect(fetch).toHaveBeenCalledTimes(1);
});

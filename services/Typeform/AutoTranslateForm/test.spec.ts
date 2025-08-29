import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('auto-translates form and saves output', async () => {
  process.env.token = process.env.TYPEFORM_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    formId: 'test_form_id',
    language: 'es',
    outputVariable: 'translationResult',
  });

  expect(ctx.outputs['translationResult']).toBeTruthy();
});

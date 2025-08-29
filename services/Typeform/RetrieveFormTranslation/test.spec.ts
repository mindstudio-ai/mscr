import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves form translation', async () => {
  process.env.token = process.env.TYPEFORM_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    formId: 'test_form_id',
    language: 'en',
    outputVariable: 'translationData',
  });

  expect(ctx.outputs['translationData']).toBeTruthy();
});

import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves form insights', async () => {
  process.env.token = process.env.TYPEFORM_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    formId: 'test-form-id',
    outputVariable: 'formInsights',
  });

  expect(ctx.outputs['formInsights']).toBeTruthy();
});

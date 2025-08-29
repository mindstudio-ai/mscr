import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes responses and saves output to result variable', async () => {
  process.env.token = 'test_token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    formId: 'test_form_id',
    responseIds: 'resp_123,resp_456',
    outputVariable: 'deletionResult',
  });

  expect(ctx.outputs['deletionResult']).toBeTruthy();
});

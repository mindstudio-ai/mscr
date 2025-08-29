import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves translation payload', async () => {
  process.env.token = 'test-token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    formId: 'test-form-id',
    outputVariable: 'translationData',
  });

  expect(ctx.outputs['translationData']).toBeTruthy();
});

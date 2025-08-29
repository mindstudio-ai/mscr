import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes form translation and saves output to result variable', async () => {
  process.env.token = 'test-token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    formId: 'abc123',
    language: 'es',
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeTruthy();
});

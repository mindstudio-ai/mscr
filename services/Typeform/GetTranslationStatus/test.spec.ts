import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves translation status and saves to output variable', async () => {
  process.env.token = 'test_token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    formId: 'abc123',
    outputVariable: 'translationStatus',
  });

  expect(ctx.outputs['translationStatus']).toBeTruthy();
});

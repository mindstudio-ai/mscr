import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves form messages', async () => {
  process.env.token = process.env.TYPEFORM_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    formId: 'abc123',
    outputVariable: 'formMessages',
  });

  expect(ctx.outputs['formMessages']).toBeTruthy();
});

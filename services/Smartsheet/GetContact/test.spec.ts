import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('get contact', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    contactId: 'test-contactId',
    outputVariable: 'result',
  });
  expect(ctx.outputs['result']).toBeTruthy();
});

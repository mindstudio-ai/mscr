import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('delete alternate email', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    userId: 'test-userId',
    alternateEmailId: 'test-alternateEmailId',
    outputVariable: 'result',
  });
  expect(ctx.outputs['result']).toBeTruthy();
});

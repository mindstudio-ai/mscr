import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets a reports publish settings', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    reportId: 'test-reportId',
    outputVariable: 'result',
  });
  expect(ctx.outputs['result']).toBeTruthy();
});

import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets report', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    reportId: 'test-report-id',
    outputVariable: 'report',
  });
  expect(ctx.outputs['report']).toBeTruthy();
});

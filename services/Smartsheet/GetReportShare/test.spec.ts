import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';
import { handler } from './handler';

test('GetReportShare executes successfully', async () => {
  process.env.accessToken = process.env.accessToken;

  const ctx = await runConnector(handler, {
    reportId: 'reportId-sample',
    shareId: 'shareId-sample',
    accessapilevel: 1,
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeDefined();
});

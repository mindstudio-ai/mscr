import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets import status', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    jobId: 'test-job-id',
    outputVariable: 'status',
  });
  expect(ctx.outputs['status']).toBeTruthy();
});

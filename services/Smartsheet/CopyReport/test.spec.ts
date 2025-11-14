import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('copies report', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    reportId: 'test-report-id',
    newName: 'Copied Report',
    outputVariable: 'newReport',
  });
  expect(ctx.outputs['newReport']).toBeTruthy();
});

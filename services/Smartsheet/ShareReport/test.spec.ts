import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('shares report', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    reportId: 'test-report-id',
    email: 'test@example.com',
    accessLevel: 'VIEWER',
    outputVariable: 'share',
  });
  expect(ctx.outputs['share']).toBeTruthy();
});

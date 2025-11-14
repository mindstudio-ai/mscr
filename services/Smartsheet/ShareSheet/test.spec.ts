import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('shares sheet', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    email: 'test@example.com',
    accessLevel: 'VIEWER',
    message: 'Please review',
    outputVariable: 'share',
  });
  expect(ctx.outputs['share']).toBeTruthy();
});

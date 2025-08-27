import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates webhook and saves output', async () => {
  process.env.token = 'test_token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    baseId: 'appXXXXXXXXXXXXXX',
    dataTypes: 'tableData',
    tableId: 'tblXXXXXXXXXXXXXX',
    notificationUrl: 'https://example.com/webhook',
    outputVariable: 'webhookData',
  });

  expect(ctx.outputs['webhookData']).toBeTruthy();
});

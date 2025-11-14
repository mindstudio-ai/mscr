import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets server info', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outputVariable: 'serverInfo',
  });
  expect(ctx.outputs['serverInfo']).toBeTruthy();
});

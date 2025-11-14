import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates sight/dashboard', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    name: 'Test Dashboard',
    outputVariable: 'sight',
  });
  expect(ctx.outputs['sight']).toBeTruthy();
});

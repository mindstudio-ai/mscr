import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets automation rule', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    automationRuleId: 'test-rule-id',
    outputVariable: 'rule',
  });
  expect(ctx.outputs['rule']).toBeTruthy();
});

import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes automation rule', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    automationRuleId: 'test-rule-id',
    outputVariable: 'result',
  });
  expect(ctx.outputs['result'].success).toBe(true);
});

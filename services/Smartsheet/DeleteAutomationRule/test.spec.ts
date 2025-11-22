import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('delete an automation rule', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheetId',
    automationRuleId: 'test-automationRuleId',
    outputVariable: 'result',
  });
  expect(ctx.outputs['result']).toBeTruthy();
});

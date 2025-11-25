import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists automation rules', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    outputVariable: 'rules',
  });
  expect(ctx.outputs['rules'].automationRules).toBeDefined();
});

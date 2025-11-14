import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a new sheet in Smartsheet', async () => {
  // Mock environment variables
  process.env.accessToken = process.env.accessToken;

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    sheetName: 'Test Sheet',
    columns: JSON.stringify([
      { title: 'Task Name', type: 'TEXT_NUMBER', primary: true },
      { title: 'Status', type: 'PICKLIST', options: ['Open', 'Closed'] },
    ]),
    outputVariable: 'newSheet',
  });

  // Verify output was set
  expect(ctx.outputs['newSheet']).toBeTruthy();
  expect(ctx.outputs['newSheet'].id).toBeDefined();
});

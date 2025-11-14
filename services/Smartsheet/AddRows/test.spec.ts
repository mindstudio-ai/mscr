import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('adds rows to a Smartsheet', async () => {
  // Mock environment variables
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    rowsData: JSON.stringify([
      {
        toBottom: true,
        cells: [
          { columnId: 123456, value: 'Test Task' },
          { columnId: 789012, value: 'Open' },
        ],
      },
    ]),
    outputVariable: 'addedRows',
  });

  // Verify output was set
  expect(ctx.outputs['addedRows']).toBeTruthy();
  expect(ctx.outputs['addedRows'].addedRows).toBeDefined();
});

import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates rows in a Smartsheet', async () => {
  // Mock environment variables
  process.env.accessToken = process.env.accessToken;

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    sheetId: 'test-sheet-id',
    rowsData: JSON.stringify([
      {
        id: 1234567890,
        cells: [
          { columnId: 123456, value: 'Updated Task' },
          { columnId: 789012, value: 'Complete' },
        ],
      },
    ]),
    outputVariable: 'updatedRows',
  });

  // Verify output was set
  expect(ctx.outputs['updatedRows']).toBeTruthy();
  expect(ctx.outputs['updatedRows'].updatedRows).toBeDefined();
});

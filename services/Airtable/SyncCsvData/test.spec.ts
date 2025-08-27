import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('syncs CSV data to Airtable', async () => {
  // Mock environment variables
  process.env.token = 'mock_token';

  const { handler } = await import('./handler.ts');

  // Mock fetch to avoid actual API calls during testing
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ success: true }),
  });

  const ctx = await runConnector(handler, {
    baseId: 'app12345abcde',
    tableIdOrName: 'Table Name',
    apiEndpointSyncId: 'syn12345abcde',
    csvData: 'column1,column2\nvalue1,value2',
    outputVariable: 'result',
  });

  expect(ctx.outputs.result).toEqual({ success: true });
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith(
    'https://api.airtable.com/v0/app12345abcde/Table%20Name/sync/syn12345abcde',
    expect.objectContaining({
      method: 'POST',
      headers: expect.objectContaining({
        Authorization: 'Bearer mock_token',
        'Content-Type': 'text/csv',
      }),
      body: 'column1,column2\nvalue1,value2',
    }),
  );
});

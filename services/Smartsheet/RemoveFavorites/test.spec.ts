import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('removes multiple favorites', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    objectType: 'sheet',
    objectIds: '123456789,987654321',
    outputVariable: 'result',
  });
  expect(ctx.outputs['result'].success).toBe(true);
});

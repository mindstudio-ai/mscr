import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';
import { handler } from './handler';

test('UpdateDashboardShare executes successfully', async () => {
  process.env.accessToken = process.env.accessToken;

  const ctx = await runConnector(handler, {
    sightId: 'sightId-sample',
    shareId: 'shareId-sample',
    accessapilevel: 1,
    accesslevel: 'accesslevel-value',
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeDefined();
});

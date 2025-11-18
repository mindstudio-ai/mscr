import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';
import { handler } from './handler';

test('ListDashboardShares executes successfully', async () => {
  process.env.accessToken = process.env.accessToken;

  const ctx = await runConnector(handler, {
    sightId: 'sightId-sample',
    sharinginclude: 'sharinginclude-value',
    includeall: true,
    page: 1,
    pagesize: 1,
    accessapilevel: 1,
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeDefined();
});

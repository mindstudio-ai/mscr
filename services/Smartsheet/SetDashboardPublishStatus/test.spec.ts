import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';
import { handler } from './handler';

test('SetDashboardPublishStatus executes successfully', async () => {
  process.env.accessToken = process.env.accessToken;

  const ctx = await runConnector(handler, {
    sightId: 'sightId-sample',
    readonlyfullenabled: 'readonlyfullenabled-value',
    readonlyfullaccessibleby: 'readonlyfullaccessibleby-value',
    readonlyfullurl: 'readonlyfullurl-value',
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeDefined();
});

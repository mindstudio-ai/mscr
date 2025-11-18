import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';
import { handler } from './handler';

test('SetReportPublishStatus executes successfully', async () => {
  process.env.accessToken = process.env.accessToken;

  const ctx = await runConnector(handler, {
    reportId: 'reportId-sample',
    readonlyfullaccessibleby: 'readonlyfullaccessibleby-value',
    readonlyfulldefaultview: 'readonlyfulldefaultview-value',
    readonlyfullenabled: 'readonlyfullenabled-value',
    readonlyfullshowtoolbar: 'readonlyfullshowtoolbar-value',
    readonlyfullurl: 'readonlyfullurl-value',
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeDefined();
});

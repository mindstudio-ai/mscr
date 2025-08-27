import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('saves Facebook ads reports to outputVariable', async () => {
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    count: '10',
    offset: '0',
    sortField: 'created_at',
    sortDir: 'DESC',
    outputVariable: 'facebookAdsData',
  });

  expect(ctx.outputs['facebookAdsData']).toBeTruthy();
});

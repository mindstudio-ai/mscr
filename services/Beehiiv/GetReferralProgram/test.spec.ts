import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('fetches referral program details', async () => {
  process.env.apiKey = process.env.BEEHIIV_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    publicationId: 'pub_00000000-0000-0000-0000-000000000000',
    limit: '10',
    page: '1',
    outputVariable: 'referralProgram',
  });

  expect(ctx.outputs['referralProgram']).toBeTruthy();
});

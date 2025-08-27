import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves automation journey details', async () => {
  process.env.apiKey = process.env.BEEHIIV_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    publicationId: 'pub_00000000-0000-0000-0000-000000000000',
    automationId: 'aut_00000000-0000-0000-0000-000000000000',
    automationJourneyId: 'aj_00000000-0000-0000-0000-000000000000',
    outputVariable: 'journeyDetails',
  });

  expect(ctx.outputs['journeyDetails']).toBeTruthy();
});

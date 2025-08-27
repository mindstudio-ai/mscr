import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('adds contacts to sequence', async () => {
  process.env.apiKey = process.env.APOLLO_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sequenceId: 'test-sequence-id',
    contactIds: 'test-contact-id-1,test-contact-id-2',
    emailAccountId: 'test-email-account-id',
    sequenceNoEmail: 'false',
    sequenceUnverifiedEmail: 'false',
    sequenceJobChange: 'false',
    sequenceActiveInOtherCampaigns: 'false',
    sequenceFinishedInOtherCampaigns: 'false',
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeTruthy();
});

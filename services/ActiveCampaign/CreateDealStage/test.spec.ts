import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a deal stage and saves output', async () => {
  // Set up environment variables
  process.env.accessToken = process.env.ACTIVECAMPAIGN_API_KEY;
  process.env.accountIdentifier = process.env.ACTIVECAMPAIGN_ACCOUNT_URL;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    title: 'Test Stage',
    group: '1', // Pipeline ID
    order: '1',
    color: '32B0FC',
    width: '280',
    dealOrder: 'next-action DESC',
    cardRegion1: 'title',
    cardRegion2: 'next-action',
    cardRegion3: 'show-avatar',
    cardRegion4: 'contact-fullname-orgname',
    cardRegion5: 'value',
    reorder: '0',
    outputVariable: 'createdStage',
  });

  expect(ctx.outputs['createdStage']).toBeTruthy();
});

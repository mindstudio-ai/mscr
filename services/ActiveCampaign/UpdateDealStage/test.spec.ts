import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates deal stage and saves output', async () => {
  process.env.accessToken = process.env.ACTIVECAMPAIGN_API_KEY;
  process.env.accountIdentifier = process.env.ACTIVECAMPAIGN_ACCOUNT_URL;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    stageId: '16',
    title: 'Updated Stage Title',
    group: '4',
    color: '696969',
    order: '1',
    width: '270',
    cardRegion1: 'contact-orgname',
    cardRegion2: 'next-action',
    cardRegion3: 'hide-avatar',
    cardRegion4: 'contact-fullname-orgname',
    cardRegion5: 'value',
    dealOrder: 'title ASC',
    reorder: '0',
    outputVariable: 'updatedStage',
  });

  expect(ctx.outputs['updatedStage']).toBeTruthy();
});

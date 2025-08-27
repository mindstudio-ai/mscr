import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates account association and saves output', async () => {
  // Set environment variables
  process.env.accessToken = process.env.ACTIVECAMPAIGN_API_KEY;
  process.env.accountIdentifier = process.env.ACTIVECAMPAIGN_BASE_URL;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    associationId: '19', // Use a valid association ID for testing
    jobTitle: 'Product Manager',
    outputVariable: 'updatedAssociation',
  });

  expect(ctx.outputs['updatedAssociation']).toBeTruthy();
});

import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates a contact and saves output', async () => {
  process.env.apiKey = process.env.APOLLO_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    contactId: '66e34b81740c50074e3d1bd4', // Use a test contact ID
    firstName: 'Test',
    lastName: 'User',
    outputVariable: 'updatedContact',
  });

  expect(ctx.outputs['updatedContact']).toBeTruthy();
  expect(ctx.outputs['updatedContact'].contact).toBeDefined();
});

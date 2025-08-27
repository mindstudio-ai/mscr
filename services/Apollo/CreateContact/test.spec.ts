import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a contact in Apollo', async () => {
  process.env.apiKey = process.env.APOLLO_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    outputVariable: 'contactData',
  });

  expect(ctx.outputs['contactData']).toBeTruthy();
});

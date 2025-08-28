import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('adds leads to list', async () => {
  process.env.apiKey = process.env.HEYREACH_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: '123',
    firstName: 'John',
    lastName: 'Doe',
    emailAddress: 'john.doe@example.com',
    companyName: 'Test Company',
    position: 'Developer',
    customFields: '[{"name":"test_field","value":"test_value"}]',
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeTruthy();
});

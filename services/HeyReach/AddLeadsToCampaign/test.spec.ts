import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('adds leads to campaign', async () => {
  process.env.apiKey = process.env.HEYREACH_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    campaignId: '123',
    firstName: 'John',
    lastName: 'Doe',
    profileUrl: 'https://www.linkedin.com/in/john-doe',
    emailAddress: 'john@example.com',
    companyName: 'Example Corp',
    position: 'Sales Manager',
    location: 'New York',
    summary: 'Experienced sales professional',
    about: 'Passionate about connecting with customers',
    linkedInAccountId: '456',
    customUserFields: '[{"name":"favorite_color","value":"blue"}]',
    outputVariable: 'result',
  });

  expect(ctx.outputs.result).toBeTruthy();
  expect(ctx.outputs.result.addedLeadsCount).toBeDefined();
});

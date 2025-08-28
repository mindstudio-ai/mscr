import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes leads from list and saves output', async () => {
  process.env.apiKey = process.env.HEYREACH_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: '3672',
    profileUrls:
      'https://www.linkedin.com/in/john-doe/\nhttps://www.linkedin.com/in/jane-doe/',
    outputVariable: 'notFoundLeads',
  });

  expect(ctx.outputs['notFoundLeads']).toBeDefined();
});

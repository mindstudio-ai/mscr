import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves merge fields and saves to output variable', async () => {
  // Set environment variables
  process.env.apiKey = process.env.MAILCHIMP_API_KEY || 'test-api-key';
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX || 'us1';

  const { handler } = await import('./handler.ts');

  // Mock inputs
  const ctx = await runConnector(handler, {
    listId: '123abc',
    count: '10',
    offset: '0',
    outputVariable: 'mergeFields',
  });

  // Verify output was set
  expect(ctx.outputs['mergeFields']).toBeDefined();
});

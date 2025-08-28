import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves lists from HeyReach', async () => {
  // Set up environment
  process.env.apiKey = process.env.HEYREACH_API_KEY;

  // Import handler
  const { handler } = await import('./handler.ts');

  // Run connector with test inputs
  const ctx = await runConnector(handler, {
    keyword: '',
    listType: '',
    offset: '0',
    limit: '10',
    outputVariable: 'lists',
  });

  // Verify output was set
  expect(ctx.outputs['lists']).toBeTruthy();
  expect(ctx.outputs['lists'].items).toBeDefined();
});

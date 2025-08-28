import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('checks if API key is valid', async () => {
  // Set the API key from environment variables
  process.env.apiKey = process.env.HEYREACH_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outputVariable: 'isValid',
  });

  // The output should be a boolean value
  expect(typeof ctx.outputs['isValid']).toBe('boolean');
});

import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('fetches AI app outputs and saves to output variable', async () => {
  // Set the API key from environment
  process.env.apiKey = process.env.FIREFLIES_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    transcriptId: '',
    appId: '',
    skip: '0',
    limit: '10',
    outputVariable: 'aiAppOutputs',
  });

  // Check that the output variable is set
  expect(ctx.outputs['aiAppOutputs']).toBeDefined();
});

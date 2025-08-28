import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves transcript data and saves to output variable', async () => {
  process.env.apiKey = process.env.FIREFLIES_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    transcriptId: 'test-transcript-id',
    fields: 'basic',
    outputVariable: 'transcriptData',
  });

  expect(ctx.outputs['transcriptData']).toBeTruthy();
});

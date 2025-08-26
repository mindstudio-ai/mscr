import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists voices and saves to output variable', async () => {
  process.env.apiKey = process.env.ELEVENLABS_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    search: '',
    voiceType: 'non-default',
    category: '',
    pageSize: '10',
    outputVariable: 'voices',
  });

  expect(ctx.outputs['voices']).toBeTruthy();
  expect(Array.isArray(ctx.outputs['voices'])).toBe(true);
});

import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('adds tags to lead', async () => {
  process.env.apiKey = process.env.HEYREACH_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    leadProfileUrl: 'https://www.linkedin.com/in/test-profile/',
    tags: 'test-tag, another-tag',
    createTagIfNotExisting: 'true',
    outputVariable: 'tagResult',
  });

  expect(ctx.outputs['tagResult']).toBeTruthy();
});

import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('replaces tags for a lead', async () => {
  process.env.apiKey = process.env.HEYREACH_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    leadProfileUrl: 'https://www.linkedin.com/in/john-doe/',
    tags: 'test-tag1, test-tag2',
    createTagIfNotExisting: 'true',
    outputVariable: 'tagResult',
  });

  expect(ctx.outputs['tagResult']).toBeTruthy();
});

test('validates that at least one identifier is provided', async () => {
  process.env.apiKey = process.env.HEYREACH_API_KEY;

  const { handler } = await import('./handler.ts');

  await expect(
    runConnector(handler, {
      tags: 'test-tag1, test-tag2',
      createTagIfNotExisting: 'true',
      outputVariable: 'tagResult',
    }),
  ).rejects.toThrow(
    'Either LinkedIn Profile URL or LinkedIn ID must be provided',
  );
});

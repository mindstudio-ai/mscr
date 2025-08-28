import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves tags for a LinkedIn profile', async () => {
  process.env.apiKey = process.env.HEYREACH_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    profileUrl: 'https://www.linkedin.com/in/john-doe/',
    outputVariable: 'leadTags',
  });

  expect(ctx.outputs['leadTags']).toBeDefined();
});

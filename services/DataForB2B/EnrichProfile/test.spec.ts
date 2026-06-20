import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('saves enriched profile to output variable', async () => {
  process.env.apiKey = process.env.DATAFORB2B_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    profileIdentifier: 'https://www.linkedin.com/in/williamhgates/',
    enrichProfile: 'true',
    outputVariable: 'profile',
  });

  expect(ctx.outputs['profile']).toBeTruthy();
});

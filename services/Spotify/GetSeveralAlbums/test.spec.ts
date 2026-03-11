import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves album data and saves to output variable', async () => {
  // Set up environment variables
   process.env.clientId = process.env.SPOTIFY_CLIENT_ID;
  process.env.clientSecret = process.env.SPOTIFY_CLIENT_SECRET;


  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    albumIds: '382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo',
    market: 'US',
    outputVariable: 'albumData',
  });

  expect(ctx.outputs['albumData']).toBeTruthy();
  expect(ctx.outputs['albumData'].albums).toBeInstanceOf(Array);
});
import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves user saved albums', async () => {
  // Set up the environment variable for the Spotify access token
  process.env.spotifyAccessToken = process.env.SPOTIFY_ACCESS_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    limit: "5",
    offset: "0",
    outputVariable: 'savedAlbums',
  });

  expect(ctx.outputs['savedAlbums']).toBeTruthy();
  expect(ctx.outputs['savedAlbums'].items).toBeDefined();
});
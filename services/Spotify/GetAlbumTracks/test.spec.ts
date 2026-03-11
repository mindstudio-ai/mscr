import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets album tracks and saves to output variable', async () => {
   process.env.clientId = process.env.SPOTIFY_CLIENT_ID;
  process.env.clientSecret = process.env.SPOTIFY_CLIENT_SECRET;


  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    albumId: '4aawyAB9vmqN3uQ7FjRGTy',
    outputVariable: 'albumTracks',
  });

  expect(ctx.outputs['albumTracks']).toBeTruthy();
  expect(ctx.outputs['albumTracks'].items).toBeDefined();
});
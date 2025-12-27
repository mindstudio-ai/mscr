import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves album information', async () => {
  // Set environment variables needed for the test
  process.env.clientId = process.env.SPOTIFY_CLIENT_ID;
  process.env.clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    albumId: '4aawyAB9vmqN3uQ7FjRGTy', // Example album ID (Kendrick Lamar's "DAMN.")
    market: 'US',
    outputVariable: 'albumInfo',
  });

  expect(ctx.outputs['albumInfo']).toBeTruthy();
  expect(ctx.outputs['albumInfo'].id).toBe('4aawyAB9vmqN3uQ7FjRGTy');
  expect(ctx.outputs['albumInfo'].name).toBeTruthy();
  expect(ctx.outputs['albumInfo'].artists).toBeTruthy();
  expect(ctx.outputs['albumInfo'].tracks).toBeTruthy();
});


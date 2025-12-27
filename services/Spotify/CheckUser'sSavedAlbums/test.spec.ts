import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('checks if albums are saved in user library', async () => {
  // Set mock access token
  process.env.accessToken = 'mock-access-token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    albumIds: '382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo',
    outputVariable: 'savedAlbums'
  });

  // We just check that the output is set and is an array
  expect(ctx.outputs['savedAlbums']).toBeDefined();
  expect(Array.isArray(ctx.outputs['savedAlbums'])).toBe(true);
});
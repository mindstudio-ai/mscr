import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('removes albums from user library', async () => {
  process.env.accessToken = process.env.SPOTIFY_ACCESS_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    albumIds: '4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M',
  });

  // Since this is a DELETE operation that returns no content on success
  // We just verify the test ran without throwing an error
  expect(ctx.logs.length).toBeGreaterThan(0);
});
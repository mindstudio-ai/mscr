import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('saves albums to Spotify library', async () => {
  // Set up mock environment variables
  process.env.accessToken = 'mock-token';

  const { handler } = await import('./handler.ts');
  
  // Mock fetch to avoid actual API call
  global.fetch = vi.fn().mockResolvedValue({
    status: 200,
    ok: true,
  });
  
  const ctx = await runConnector(handler, {
    albumIds: '382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo',
    successMessage: 'result'
  });

  expect(ctx.outputs['result']).toBeTruthy();
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith(
    'https://api.spotify.com/v1/me/albums?ids=382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo',
    expect.objectContaining({
      method: 'PUT',
      headers: expect.objectContaining({
        'Authorization': 'Bearer mock-token'
      })
    })
  );
});
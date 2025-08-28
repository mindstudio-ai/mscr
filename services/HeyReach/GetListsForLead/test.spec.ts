import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('saves output to outVar when using profile URL', async () => {
  process.env.apiKey = process.env.HEYREACH_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    profileUrl: 'https://www.linkedin.com/in/john_doe/',
    offset: '0',
    limit: '100',
    outputVariable: 'outVar',
  });

  expect(ctx.outputs['outVar']).toBeTruthy();
});

test('throws error when no lead identification is provided', async () => {
  process.env.apiKey = process.env.HEYREACH_API_KEY;

  const { handler } = await import('./handler.ts');

  await expect(
    runConnector(handler, {
      offset: '0',
      limit: '100',
      outputVariable: 'outVar',
    }),
  ).rejects.toThrow(
    'At least one lead identifier (email, LinkedIn ID, or profile URL) must be provided',
  );
});

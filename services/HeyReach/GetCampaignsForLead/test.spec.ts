import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('saves output to outVar', async () => {
  process.env.apiKey = process.env.HEYREACH_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    email: 'test@example.com',
    offset: '0',
    limit: '100',
    outputVariable: 'outVar',
  });

  expect(ctx.outputs['outVar']).toBeTruthy();
});

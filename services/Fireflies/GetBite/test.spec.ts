import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves bite information', async () => {
  process.env.apiKey = process.env.FIREFLIES_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    biteId: 'test-bite-id',
    fieldsToInclude: 'basic',
    outputVariable: 'biteInfo',
  });

  expect(ctx.outputs['biteInfo']).toBeTruthy();
});

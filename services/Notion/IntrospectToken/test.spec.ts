import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('introspects token and saves output', async () => {
  process.env.token = 'test_token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    tokenToIntrospect: '',
    outputVariable: 'tokenInfo',
  });

  expect(ctx.outputs['tokenInfo']).toBeTruthy();
  expect(ctx.outputs['tokenInfo']).toHaveProperty('active');
  expect(ctx.outputs['tokenInfo']).toHaveProperty('scope');
  expect(ctx.outputs['tokenInfo']).toHaveProperty('iat');
});

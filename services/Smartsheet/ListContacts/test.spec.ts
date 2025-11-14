import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists contacts', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outputVariable: 'contacts',
  });
  expect(ctx.outputs['contacts'].contacts).toBeDefined();
});

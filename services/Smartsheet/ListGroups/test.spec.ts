import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists groups', async () => {
  process.env.accessToken = process.env.accessToken;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outputVariable: 'groups',
  });
  expect(ctx.outputs['groups'].groups).toBeDefined();
});

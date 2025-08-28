import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('saves user groups to output variable', async () => {
  process.env.apiKey = process.env.FIREFLIES_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    onlyMyGroups: 'false',
    outputVariable: 'userGroups',
  });

  expect(ctx.outputs['userGroups']).toBeTruthy();
  expect(Array.isArray(ctx.outputs['userGroups'])).toBe(true);
});

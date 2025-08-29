import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists group relationships and saves to output variable', async () => {
  process.env.token = process.env.CALENDLY_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    groupUri: 'https://api.calendly.com/groups/EXAMPLE_GROUP_ID',
    count: '10',
    outputVariable: 'groupRelationships',
  });

  expect(ctx.outputs['groupRelationships']).toBeTruthy();
  expect(ctx.outputs['groupRelationships'].collection).toBeDefined();
  expect(ctx.outputs['groupRelationships'].pagination).toBeDefined();
});

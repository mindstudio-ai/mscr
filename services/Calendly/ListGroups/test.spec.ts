import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists Calendly groups', async () => {
  process.env.token = process.env.CALENDLY_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    count: '10',
    outputVariable: 'groups',
  });

  expect(ctx.outputs['groups']).toBeTruthy();
  expect(ctx.outputs['groups'].groups).toBeInstanceOf(Array);
  expect(ctx.outputs['groups'].pagination).toBeDefined();
});

test('handles pagination with page token', async () => {
  process.env.token = process.env.CALENDLY_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    count: '5',
    pageToken: 'some_token',
    outputVariable: 'paginatedGroups',
  });

  expect(ctx.outputs['paginatedGroups']).toBeTruthy();
});

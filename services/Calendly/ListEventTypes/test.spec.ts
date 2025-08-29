import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists event types and saves to output variable', async () => {
  process.env.token = process.env.CALENDLY_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outputVariable: 'eventTypes',
  });

  expect(ctx.outputs['eventTypes']).toBeTruthy();
  expect(ctx.outputs['eventTypes'].collection).toBeDefined();
  expect(Array.isArray(ctx.outputs['eventTypes'].collection)).toBe(true);
});

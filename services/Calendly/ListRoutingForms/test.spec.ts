import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists routing forms and saves to output variable', async () => {
  // Set up environment token
  process.env.token = process.env.CALENDLY_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    count: '10',
    sort: 'created_at:desc',
    outputVariable: 'routingForms',
  });

  expect(ctx.outputs['routingForms']).toBeTruthy();
  expect(ctx.outputs['routingForms'].collection).toBeDefined();
});

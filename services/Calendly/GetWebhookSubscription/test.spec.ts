import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves webhook subscription details', async () => {
  process.env.token = 'mock-token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    webhookUuid: '00000000-0000-0000-0000-000000000000',
    outputVariable: 'webhookDetails',
  });

  expect(ctx.outputs['webhookDetails']).toBeDefined();
});

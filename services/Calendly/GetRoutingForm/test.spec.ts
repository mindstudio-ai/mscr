import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves routing form details', async () => {
  process.env.token = 'mock-token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    routingFormUuid: 'mock-uuid',
    outputVariable: 'routingFormData',
  });

  expect(ctx.outputs['routingFormData']).toBeTruthy();
});

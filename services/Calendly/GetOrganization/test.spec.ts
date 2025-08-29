import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves organization details', async () => {
  process.env.token = process.env.CALENDLY_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    organizationUuid: 'sample-uuid',
    outputVariable: 'organizationData',
  });

  expect(ctx.outputs['organizationData']).toBeTruthy();
});

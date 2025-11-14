import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('copies sight/dashboard', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sightId: 'test-sight-id',
    newName: 'Copied Dashboard',
    outputVariable: 'newSight',
  });
  expect(ctx.outputs['newSight']).toBeTruthy();
});

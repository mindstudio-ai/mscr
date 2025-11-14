import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('shares sight/dashboard', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sightId: 'test-sight-id',
    email: 'test@example.com',
    accessLevel: 'VIEWER',
    outputVariable: 'share',
  });
  expect(ctx.outputs['share']).toBeTruthy();
});

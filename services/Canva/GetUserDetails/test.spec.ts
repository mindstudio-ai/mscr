import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves user details from Canva API', async () => {
  // Set up environment variables
  process.env.token = process.env.CANVA_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outputVariable: 'userDetails',
  });

  // Verify that the output variable contains the expected structure
  expect(ctx.outputs['userDetails']).toBeTruthy();
  expect(ctx.outputs['userDetails'].team_user).toBeDefined();
  expect(ctx.outputs['userDetails'].team_user.user_id).toBeDefined();
  expect(ctx.outputs['userDetails'].team_user.team_id).toBeDefined();
});

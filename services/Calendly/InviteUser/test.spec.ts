import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('invites user to organization', async () => {
  process.env.token = process.env.CALENDLY_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    organizationUuid: '00000000-0000-0000-0000-000000000000',
    email: 'test@example.com',
    outputVariable: 'invitationResult',
  });

  expect(ctx.outputs['invitationResult']).toBeTruthy();
});

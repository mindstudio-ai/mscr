import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes invitee no-show status', async () => {
  process.env.token = process.env.CALENDLY_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    inviteeNoShowUuid: '12345678-1234-1234-1234-123456789012',
    outputVariable: 'successMessage',
  });

  expect(ctx.outputs['successMessage']).toBeTruthy();
});

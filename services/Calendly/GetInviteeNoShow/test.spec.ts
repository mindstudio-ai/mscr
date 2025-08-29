import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves invitee no-show information', async () => {
  process.env.token = process.env.CALENDLY_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    inviteeUuid: '12345678-1234-1234-1234-123456789012',
    outputVariable: 'noShowInfo',
  });

  expect(ctx.outputs['noShowInfo']).toBeTruthy();
});

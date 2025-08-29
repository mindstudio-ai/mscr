import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves user availability schedules', async () => {
  process.env.token = process.env.CALENDLY_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    userUri: 'https://api.calendly.com/users/ABCDEF123456',
    outputVariable: 'schedules',
  });

  expect(ctx.outputs['schedules']).toBeTruthy();
});

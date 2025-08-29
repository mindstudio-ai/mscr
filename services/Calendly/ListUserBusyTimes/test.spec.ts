import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves user busy times', async () => {
  process.env.token = process.env.CALENDLY_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    userUuid: 'ABCDEFGHIJKLMNOPQRST',
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    outputVariable: 'busyTimes',
  });

  expect(ctx.outputs['busyTimes']).toBeDefined();
});

import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';
import { handler } from './handler';

test('UpdateUserProfileImage executes successfully', async () => {
  process.env.accessToken = process.env.accessToken;

  const ctx = await runConnector(handler, {
    userId: 'userId-sample',
    attachmentsubtype: 'attachmentsubtype-value',
    attachmenttype: 'attachmenttype-value',
    description: 'description-value',
    name: 'name-value',
    url: 'url-value',
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeDefined();
});

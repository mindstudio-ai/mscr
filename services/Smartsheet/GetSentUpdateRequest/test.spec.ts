import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';
import { handler } from './handler';

test('GetSentUpdateRequest executes successfully', async () => {
  process.env.accessToken = process.env.accessToken;

  const ctx = await runConnector(handler, {
    sheetId: 'sheetId-sample',
    sentUpdateRequestId: 'sentUpdateRequestId-sample',
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeDefined();
});

import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';
import { handler } from './handler';

test('DeleteProofVersion executes successfully', async () => {
  process.env.accessToken = process.env.accessToken;

  const ctx = await runConnector(handler, {
    sheetId: 'sheetId-sample',
    proofId: 'proofId-sample',
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeDefined();
});

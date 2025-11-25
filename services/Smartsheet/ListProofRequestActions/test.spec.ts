import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';
import { handler } from './handler';

test('ListProofRequestActions executes successfully', async () => {
  process.env.accessToken = process.env.accessToken;

  const ctx = await runConnector(handler, {
    sheetId: 'sheetId-sample',
    proofId: 'proofId-sample',
    page: 1,
    pagesize: 1,
    includeall: true,
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeDefined();
});

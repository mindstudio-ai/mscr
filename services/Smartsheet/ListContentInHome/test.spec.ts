import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';
import { handler } from './handler';

test('ListContentInHome executes successfully', async () => {
  process.env.accessToken = process.env.accessToken;

  const ctx = await runConnector(handler, {
    outputVariable: 'output',
  });

  expect(ctx.outputs['output']).toBeDefined();
});

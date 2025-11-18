import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';
import { handler } from './handler';

test('SearchEverything executes successfully', async () => {
  process.env.accessToken = process.env.accessToken;

  const ctx = await runConnector(handler, {
    query: 'query-value',
    location: 'location-value',
    modifiedsince: 'modifiedsince-value',
    include: 'include-value',
    scopes: 'scopes-value',
    scopesValue: 'scopesValue-value',
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeDefined();
});

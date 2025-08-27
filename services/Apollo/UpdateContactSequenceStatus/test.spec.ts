import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates contact sequence status', async () => {
  process.env.apiKey = process.env.APOLLO_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    sequenceIds: '66e9e215ece19801b219997f',
    contactIds: '66e34b81740c50074e3d1bd4',
    mode: 'mark_as_finished',
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeTruthy();
});

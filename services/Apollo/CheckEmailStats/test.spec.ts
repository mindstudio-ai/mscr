import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('saves email stats to output variable', async () => {
  process.env.apiKey = process.env.APOLLO_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    emailId: '684b2203a2ce950021cbf730',
    outputVariable: 'emailStats',
  });

  expect(ctx.outputs['emailStats']).toBeTruthy();
});

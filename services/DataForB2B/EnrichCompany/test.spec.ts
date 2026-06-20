import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('saves enriched company to output variable', async () => {
  process.env.apiKey = process.env.DATAFORB2B_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    companyIdentifier: 'google',
    outputVariable: 'company',
  });

  expect(ctx.outputs['company']).toBeTruthy();
});

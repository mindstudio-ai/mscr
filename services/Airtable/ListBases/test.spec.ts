import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists Airtable bases', async () => {
  process.env.token = process.env.AIRTABLE_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    offset: '',
    outputVariable: 'basesList',
  });

  expect(ctx.outputs['basesList']).toBeTruthy();
  expect(ctx.outputs['basesList'].bases).toBeInstanceOf(Array);
});

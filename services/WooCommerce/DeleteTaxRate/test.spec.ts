import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes tax rate and saves output to outVar', async () => {
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    taxRateId: '72',
    confirmDeletion: 'true',
    outputVariable: 'outVar',
  });

  expect(ctx.outputs['outVar']).toBeTruthy();
});

test('prevents deletion when not confirmed', async () => {
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test';
  process.env.consumerSecret = 'cs_test';

  const { handler } = await import('./handler.ts');

  await expect(
    runConnector(handler, {
      taxRateId: '72',
      confirmDeletion: 'false',
      outputVariable: 'outVar',
    }),
  ).rejects.toThrow('Deletion not confirmed');
});

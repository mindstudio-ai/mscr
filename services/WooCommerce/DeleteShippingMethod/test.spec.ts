import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes shipping method and saves output', async () => {
  // Set up environment variables
  process.env.url = 'https://example.com';
  process.env.consumerKey = 'ck_test_key';
  process.env.consumerSecret = 'cs_test_secret';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    zoneId: '5',
    methodId: '26',
    outputVariable: 'deletedMethod',
  });

  expect(ctx.outputs['deletedMethod']).toBeTruthy();
});

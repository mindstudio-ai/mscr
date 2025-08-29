import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves themes and saves to output variable', async () => {
  process.env.token = 'test-token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    page: '1',
    pageSize: '10',
    outputVariable: 'themes',
  });

  expect(ctx.outputs['themes']).toBeTruthy();
});

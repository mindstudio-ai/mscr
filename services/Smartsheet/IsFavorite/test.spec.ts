import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';
import { handler } from './handler';

test('IsFavorite executes successfully', async () => {
  process.env.accessToken = process.env.accessToken;

  const ctx = await runConnector(handler, {
    favoriteType: 'favoriteType-sample',
    favoriteId: 'favoriteId-sample',
    include: 'include-value',
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeDefined();
});

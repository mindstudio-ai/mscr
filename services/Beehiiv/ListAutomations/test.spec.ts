import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists automations and saves to output variable', async () => {
  process.env.apiKey = process.env.BEEHIIV_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    publicationId: 'pub_00000000-0000-0000-0000-000000000000',
    limit: '10',
    page: '1',
    outputVariable: 'automations',
  });

  expect(ctx.outputs['automations']).toBeTruthy();
});

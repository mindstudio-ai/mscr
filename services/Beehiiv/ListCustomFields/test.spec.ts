import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('lists custom fields and saves to output variable', async () => {
  process.env.apiKey = process.env.BEEHIIV_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    publicationId: 'pub_test123',
    page: '1',
    limit: '10',
    outputVariable: 'customFields',
  });

  expect(ctx.outputs['customFields']).toBeTruthy();
});

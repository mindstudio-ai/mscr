import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves custom field data', async () => {
  // Set environment variables
  process.env.apiKey = process.env.BEEHIIV_API_KEY;

  const { handler } = await import('./handler.ts');

  // Mock inputs
  const ctx = await runConnector(handler, {
    publicationId: 'pub_test123',
    customFieldId: '00000000-0000-0000-0000-000000000000',
    outputVariable: 'customFieldData',
  });

  // Verify output was set
  expect(ctx.outputs['customFieldData']).toBeTruthy();
});

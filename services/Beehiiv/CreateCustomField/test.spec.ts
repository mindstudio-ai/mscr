import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('creates a custom field and saves output', async () => {
  process.env.apiKey = process.env.BEEHIIV_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    publicationId: 'pub_test123',
    fieldType: 'string',
    displayName: 'Test Field',
    outputVariable: 'customField',
  });

  expect(ctx.outputs['customField']).toBeTruthy();
  expect(ctx.outputs['customField'].id).toBeTruthy();
  expect(ctx.outputs['customField'].kind).toBe('string');
  expect(ctx.outputs['customField'].display).toBe('Test Field');
});

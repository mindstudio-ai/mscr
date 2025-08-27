import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('updates custom field and saves output', async () => {
  process.env.apiKey = process.env.BEEHIIV_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    publicationId: 'pub_12345',
    customFieldId: 'test_field_id',
    display: 'Updated Field Name',
    outputVariable: 'updatedField',
  });

  expect(ctx.outputs['updatedField']).toBeTruthy();
  expect(ctx.outputs['updatedField'].id).toBeDefined();
  expect(ctx.outputs['updatedField'].display).toBeDefined();
});

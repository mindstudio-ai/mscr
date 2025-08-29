import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves forms from Typeform', async () => {
  process.env.token = process.env.TYPEFORM_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    outputVariable: 'forms',
  });

  expect(ctx.outputs['forms']).toBeTruthy();
});

test('applies query parameters correctly', async () => {
  process.env.token = process.env.TYPEFORM_TOKEN;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    search: 'test',
    page: '1',
    pageSize: '5',
    sortBy: 'created_at',
    orderBy: 'desc',
    outputVariable: 'filteredForms',
  });

  expect(ctx.outputs['filteredForms']).toBeTruthy();
});

import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('retrieves brand template metadata', async () => {
  // Set up environment variables
  process.env.token = process.env.CANVA_TOKEN;

  // Mock brand template ID
  const brandTemplateId = 'DEMzWSwy3BI';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    brandTemplateId,
    outputVariable: 'templateData',
  });

  // Verify that output was set
  expect(ctx.outputs['templateData']).toBeTruthy();

  // If the API call succeeds, we should have an object with these properties
  if (ctx.outputs['templateData']) {
    const data = ctx.outputs['templateData'];
    expect(data).toHaveProperty('brand_template');
  }
});

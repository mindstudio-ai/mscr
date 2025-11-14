import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('gets contact details', async () => {
  process.env.accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    contactId: 'test-contact-id',
    outputVariable: 'contact',
  });
  expect(ctx.outputs['contact']).toBeTruthy();
});

import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('fetches routing form submissions', async () => {
  process.env.token = 'mock_token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    routingFormUuid: 'test-uuid',
    count: '10',
    sort: 'created_at:desc',
    outputVariable: 'submissions',
  });

  expect(ctx.outputs['submissions']).toBeDefined();
});

test('handles pagination token', async () => {
  process.env.token = 'mock_token';

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    routingFormUuid: 'test-uuid',
    pageToken: 'next_page_token',
    outputVariable: 'submissions',
  });

  expect(ctx.outputs['submissions']).toBeDefined();
});

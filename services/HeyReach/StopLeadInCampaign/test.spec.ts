import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('stops lead in campaign', async () => {
  process.env.apiKey = process.env.HEYREACH_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    campaignId: '123',
    leadMemberId: '123123123',
    leadUrl: 'https://www.linkedin.com/in/john-doe',
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeTruthy();
});

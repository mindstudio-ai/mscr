import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('adds member event to MailChimp list', async () => {
  process.env.apiKey = process.env.MAILCHIMP_API_KEY;
  process.env.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: 'test-list-id',
    subscriberId: 'test@example.com',
    eventName: 'test_event',
    eventProperties: { property1: 'value1' },
    preventAutomations: 'false',
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeTruthy();
});

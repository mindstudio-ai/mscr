import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';
import { handler } from './handler';

test('SendReport executes successfully', async () => {
  process.env.accessToken = process.env.accessToken;

  const ctx = await runConnector(handler, {
    reportId: 'reportId-sample',
    format: 'format-value',
    formatdetails: 'formatdetails-value',
    ccme: 'ccme-value',
    message: 'message-value',
    sendto: 'sendto-value',
    email: 'email-value',
    emailValue: 'emailValue-value',
    subject: 'subject-value',
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeDefined();
});

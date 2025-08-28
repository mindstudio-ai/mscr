import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('checks if lead is a connection', async () => {
  process.env.apiKey = process.env.HEYREACH_API_KEY;

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    senderAccountId: '123456',
    leadProfileUrl: 'https://www.linkedin.com/in/johndoe/',
    outputVariable: 'isConnection',
  });

  expect(ctx.outputs['isConnection']).toBeDefined();
});

test('validates input parameters', async () => {
  process.env.apiKey = process.env.HEYREACH_API_KEY;

  const { handler } = await import('./handler.ts');

  await expect(
    runConnector(handler, {
      senderAccountId: '123456',
      leadProfileUrl: 'https://www.linkedin.com/in/johndoe/',
      leadLinkedInId: 'abc123',
      outputVariable: 'isConnection',
    }),
  ).rejects.toThrow();

  await expect(
    runConnector(handler, {
      senderAccountId: '123456',
      outputVariable: 'isConnection',
    }),
  ).rejects.toThrow();
});

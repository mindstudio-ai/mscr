import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes a list member when confirmed', async () => {
  // Set environment variables
  process.env.apiKey = 'dummy-api-key';
  process.env.serverPrefix = 'us1';

  // Mock the handler import
  const { handler } = await import('./handler.ts');

  // Run the connector with test inputs
  const ctx = await runConnector(handler, {
    listId: 'test-list-id',
    email: 'test@example.com',
    confirmDeletion: 'yes',
    outputVariable: 'result',
  });

  // Check that the output was set
  expect(ctx.outputs['result']).toBeTruthy();
});

test('does not delete a list member when not confirmed', async () => {
  // Set environment variables
  process.env.apiKey = 'dummy-api-key';
  process.env.serverPrefix = 'us1';

  // Mock the handler import
  const { handler } = await import('./handler.ts');

  // Run the connector with test inputs
  const ctx = await runConnector(handler, {
    listId: 'test-list-id',
    email: 'test@example.com',
    confirmDeletion: 'no',
    outputVariable: 'result',
  });

  // Check that the output contains the cancellation message
  expect(ctx.outputs['result']).toContain('cancelled');
});

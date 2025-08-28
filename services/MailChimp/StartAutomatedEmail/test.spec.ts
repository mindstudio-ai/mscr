import { expect, test, vi } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('starts an automated email successfully', async () => {
  // Set up environment variables
  process.env.apiKey = 'test-api-key';
  process.env.serverPrefix = 'us1';

  // Mock the MailChimp client
  vi.mock('@mailchimp/mailchimp_marketing', () => {
    return {
      default: {
        setConfig: vi.fn(),
        automations: {
          startWorkflowEmail: vi.fn().mockResolvedValue(true),
        },
      },
    };
  });

  const { handler } = await import('./handler.ts');

  // Run the connector with test inputs
  const ctx = await runConnector(handler, {
    workflowId: 'test-workflow-id',
    workflowEmailId: 'test-email-id',
  });

  // Verify the log output contains success message
  expect(ctx.logs).toContain('Successfully started the automated email');
});

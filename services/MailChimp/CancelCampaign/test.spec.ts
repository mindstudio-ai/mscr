import { expect, test, vi } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('returns success message when campaign is cancelled', async () => {
  // Set up environment variables
  process.env.apiKey = 'test-api-key';
  process.env.serverPrefix = 'us1';

  // Mock the Mailchimp client
  vi.mock('@mailchimp/mailchimp_marketing', () => {
    return {
      default: {
        setConfig: vi.fn(),
        campaigns: {
          cancelSend: vi.fn().mockResolvedValue(undefined),
        },
      },
    };
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    campaignId: 'test-campaign-id',
    confirmationMessage: 'CONFIRM',
    outputVariable: 'result',
  });

  expect(ctx.outputs['result']).toBeTruthy();
  expect(ctx.outputs['result']).toContain('successfully cancelled');
});

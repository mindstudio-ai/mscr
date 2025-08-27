import { expect, test, vi } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('sends campaign and saves output', async () => {
  // Setup environment variables
  process.env.apiKey = 'test-api-key';
  process.env.serverPrefix = 'us1';

  // Mock the Mailchimp client
  vi.mock('@mailchimp/mailchimp_marketing', () => {
    return {
      default: {
        setConfig: vi.fn(),
        campaigns: {
          send: vi.fn().mockResolvedValue(true),
        },
      },
    };
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    campaignId: 'test-campaign-id',
    outputVariable: 'campaignSendResult',
  });

  expect(ctx.outputs['campaignSendResult']).toBeTruthy();
});

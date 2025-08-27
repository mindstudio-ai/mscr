import { expect, test, vi } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('successfully resumes an RSS campaign', async () => {
  // Set environment variables
  process.env.apiKey = 'test-api-key';
  process.env.serverPrefix = 'us1';

  const { handler } = await import('./handler.ts');

  // Mock the MailChimp client
  vi.mock('@mailchimp/mailchimp_marketing', () => {
    return {
      default: {
        setConfig: vi.fn(),
        campaigns: {
          resumeRssCampaign: vi.fn().mockResolvedValue(true),
        },
      },
    };
  });

  const ctx = await runConnector(handler, {
    campaignId: 'test-campaign-id',
    successVariable: 'success',
  });

  expect(ctx.outputs['success']).toBeTruthy();
});

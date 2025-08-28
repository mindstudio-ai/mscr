import { expect, test, vi } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

// Mock the mailchimp marketing client
vi.mock('@mailchimp/mailchimp_marketing', () => {
  return {
    default: {
      setConfig: vi.fn(),
      campaigns: {
        schedule: vi.fn().mockResolvedValue({}),
      },
    },
  };
});

test('schedules a campaign', async () => {
  // Set up environment variables
  process.env.apiKey = 'test-api-key';
  process.env.serverPrefix = 'us1';

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    campaignId: 'abc123',
    scheduleTime: '2023-12-31T12:00:00Z',
    useTimewarp: 'false',
    useBatchDelivery: 'false',
  });

  expect(ctx.success).toBeTruthy();
});

test('schedules a campaign with batch delivery', async () => {
  // Set up environment variables
  process.env.apiKey = 'test-api-key';
  process.env.serverPrefix = 'us1';

  const { handler } = await import('./handler.ts');

  const ctx = await runConnector(handler, {
    campaignId: 'abc123',
    scheduleTime: '2023-12-31T12:00:00Z',
    useTimewarp: 'false',
    useBatchDelivery: 'true',
    batchDelay: '30',
    batchCount: '3',
  });

  expect(ctx.success).toBeTruthy();
});

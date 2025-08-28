import { expect, test, vi } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes segment and saves success message', async () => {
  // Set environment variables
  process.env.apiKey = 'test-api-key';
  process.env.serverPrefix = 'us1';

  // Mock the mailchimp client
  vi.mock('@mailchimp/mailchimp_marketing', () => {
    return {
      default: {
        setConfig: vi.fn(),
        lists: {
          deleteSegment: vi.fn().mockResolvedValue(undefined),
        },
      },
    };
  });

  const { handler } = await import('./handler.ts');
  const ctx = await runConnector(handler, {
    listId: 'test-list-id',
    segmentId: 'test-segment-id',
    outputMessage: 'resultMessage',
  });

  expect(ctx.outputs['resultMessage']).toBe('Segment successfully deleted');
});

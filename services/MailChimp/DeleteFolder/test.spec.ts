import { expect, test, vi } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

// Mock the mailchimp client
vi.mock('@mailchimp/mailchimp_marketing', () => {
  return {
    default: {
      setConfig: vi.fn(),
      fileManager: {
        deleteFolder: vi.fn().mockResolvedValue(undefined),
      },
    },
  };
});

test('successfully deletes a folder', async () => {
  // Set up environment variables
  process.env.apiKey = 'test-api-key';
  process.env.serverPrefix = 'us1';

  const { handler } = await import('./handler.ts');

  // Run the connector with test inputs
  const ctx = await runConnector(handler, {
    folderId: 'test-folder-id',
  });

  // Verify the log message was created
  expect(ctx.logs).toContain(
    'Successfully deleted folder with ID: test-folder-id',
  );
});

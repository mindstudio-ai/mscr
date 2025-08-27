import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('deletes a custom field', async () => {
  process.env.apiKey = process.env.BEEHIIV_API_KEY;

  const { handler } = await import('./handler.ts');

  // Mock the client methods
  const mockDelete = vi.fn().mockResolvedValue({});
  vi.mock('beehiiv', () => ({
    BeehiivClient: vi.fn().mockImplementation(() => ({
      customFields: {
        delete: mockDelete,
      },
    })),
  }));

  await runConnector(handler, {
    publicationId: 'pub_test123',
    customFieldId: 'cf_test456',
  });

  expect(mockDelete).toHaveBeenCalledWith('pub_test123', 'cf_test456');
});

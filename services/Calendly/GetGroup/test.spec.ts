import { expect, test } from 'vitest';
import runConnector from '../../../src/utils/testHarness';

test('fetches group details and saves to output variable', async () => {
  // Mock the token environment variable
  process.env.token = 'mock_token';

  const { handler } = await import('./handler.ts');

  // Mock a valid group UUID
  const mockGroupUuid = '123e4567-e89b-12d3-a456-426614174000';

  // Run the connector with test inputs
  const ctx = await runConnector(handler, {
    groupUuid: mockGroupUuid,
    outputVariable: 'groupDetails',
  });

  // Verify that the output was set
  expect(ctx.outputs.groupDetails).toBeTruthy();
});

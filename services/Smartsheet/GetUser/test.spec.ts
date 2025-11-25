import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handler } from './handler';
import runConnector from '../../../src/utils/testHarness';

describe('GetUser', () => {
  const mockSetOutput = vi.fn();
  const mockLog = vi.fn();
  const mockUploadFile = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.accessToken = 'test-token';
  });

  it('should get user successfully', async () => {
    const inputs = {
      userId: '123456789',
      outputVariable: 'userDetails',
    };

    const ctx = await runConnector(handler, inputs);
    expect(ctx.outputs['userDetails']).toBeTruthy();
  });

  it('should throw error when userId is missing', async () => {
    const inputs = {
      userId: '',
      outputVariable: 'userDetails',
    };

    await expect(
      handler({
        inputs,
        setOutput: mockSetOutput,
        log: mockLog,
        uploadFile: mockUploadFile,
      }),
    ).rejects.toThrow('User ID is required');
  });
});

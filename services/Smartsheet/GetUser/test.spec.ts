import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handler } from './handler';

describe('GetUser', () => {
  const mockSetOutput = vi.fn();
  const mockLog = vi.fn();
  const mockUploadFile = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.SMARTSHEET_ACCESS_TOKEN = 'test-token';
  });

  it('should get user successfully', async () => {
    const inputs = {
      userId: '123456789',
      outputVariable: 'userDetails',
    };

    await expect(
      handler({
        inputs,
        setOutput: mockSetOutput,
        log: mockLog,
        uploadFile: mockUploadFile,
      }),
    ).resolves.not.toThrow();

    expect(mockLog).toHaveBeenCalledWith('Retrieving user 123456789...');
  });

  it('should throw error when userId is missing', async () => {
    const inputs = {
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

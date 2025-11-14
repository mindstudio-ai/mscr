import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handler } from './handler';

describe('GetUserAlternateEmail', () => {
  const mockSetOutput = vi.fn();
  const mockLog = vi.fn();
  const mockUploadFile = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.accessToken = 'test-token';
  });

  it('should get alternate email successfully', async () => {
    const inputs = {
      userId: '123456789',
      alternateEmailId: '987654321',
      outputVariable: 'alternateEmailDetails',
    };

    await expect(
      handler({
        inputs,
        setOutput: mockSetOutput,
        log: mockLog,
        uploadFile: mockUploadFile,
      }),
    ).resolves.not.toThrow();

    expect(mockLog).toHaveBeenCalledWith(
      'Retrieving alternate email 987654321 for user 123456789...',
    );
  });

  it('should throw error when userId is missing', async () => {
    const inputs = {
      alternateEmailId: '987654321',
      outputVariable: 'alternateEmailDetails',
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

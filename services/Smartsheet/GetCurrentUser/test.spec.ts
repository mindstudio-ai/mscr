import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handler } from './handler';

describe('GetCurrentUser', () => {
  const mockSetOutput = vi.fn();
  const mockLog = vi.fn();
  const mockUploadFile = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.accessToken = 'test-token';
  });

  it('should get current user successfully', async () => {
    const inputs = {
      outputVariable: 'currentUser',
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
      'Retrieving current user information...',
    );
  });

  it('should throw error when access token is missing', async () => {
    delete process.env.accessToken;

    const inputs = {
      outputVariable: 'currentUser',
    };

    await expect(
      handler({
        inputs,
        setOutput: mockSetOutput,
        log: mockLog,
        uploadFile: mockUploadFile,
      }),
    ).rejects.toThrow('Smartsheet access token is not configured');
  });
});

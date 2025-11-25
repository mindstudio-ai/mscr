import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handler } from './handler';

describe('RemoveUser', () => {
  const mockSetOutput = vi.fn();
  const mockLog = vi.fn();
  const mockUploadFile = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.accessToken = 'test-token';
  });

  it('should remove user successfully', async () => {
    const inputs = {
      userId: '123456789',
      transferTo: '987654321',
      removeFromSharing: true,
      outputVariable: 'removalResult',
    };

    await expect(
      handler({
        inputs,
        setOutput: mockSetOutput,
        log: mockLog,
        uploadFile: mockUploadFile,
      }),
    ).resolves.not.toThrow();

    expect(mockLog).toHaveBeenCalledWith('Removing user 123456789...');
  });

  it('should throw error when userId is missing', async () => {
    const inputs = {
      outputVariable: 'removalResult',
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

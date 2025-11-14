import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handler } from './handler';

describe('UpdateUser', () => {
  const mockSetOutput = vi.fn();
  const mockLog = vi.fn();
  const mockUploadFile = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.SMARTSHEET_ACCESS_TOKEN = 'test-token';
  });

  it('should update user successfully', async () => {
    const inputs = {
      userId: '123456789',
      admin: true,
      licensedSheetCreator: true,
      outputVariable: 'updatedUser',
    };

    await expect(
      handler({
        inputs,
        setOutput: mockSetOutput,
        log: mockLog,
        uploadFile: mockUploadFile,
      }),
    ).resolves.not.toThrow();

    expect(mockLog).toHaveBeenCalledWith('Updating user 123456789...');
  });

  it('should throw error when userId is missing', async () => {
    const inputs = {
      admin: true,
      outputVariable: 'updatedUser',
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

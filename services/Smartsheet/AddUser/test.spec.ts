import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handler } from './handler';

describe('AddUser', () => {
  const mockSetOutput = vi.fn();
  const mockLog = vi.fn();
  const mockUploadFile = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.SMARTSHEET_ACCESS_TOKEN = 'test-token';
  });

  it('should add user successfully', async () => {
    const inputs = {
      email: 'newuser@example.com',
      firstName: 'John',
      lastName: 'Doe',
      admin: false,
      licensedSheetCreator: true,
      outputVariable: 'newUser',
    };

    await expect(
      handler({
        inputs,
        setOutput: mockSetOutput,
        log: mockLog,
        uploadFile: mockUploadFile,
      }),
    ).resolves.not.toThrow();

    expect(mockLog).toHaveBeenCalledWith('Adding user newuser@example.com...');
  });

  it('should throw error when email is missing', async () => {
    const inputs = {
      outputVariable: 'newUser',
    };

    await expect(
      handler({
        inputs,
        setOutput: mockSetOutput,
        log: mockLog,
        uploadFile: mockUploadFile,
      }),
    ).rejects.toThrow('Email is required');
  });
});

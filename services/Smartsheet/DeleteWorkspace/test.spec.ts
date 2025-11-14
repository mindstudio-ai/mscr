import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handler } from './handler';

describe('DeleteWorkspace', () => {
  const mockSetOutput = vi.fn();
  const mockLog = vi.fn();
  const mockUploadFile = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.accessToken = 'test-token';
  });

  it('should delete workspace successfully', async () => {
    const inputs = {
      workspaceId: '123456789',
      outputVariable: 'deletionResult',
    };

    await expect(
      handler({
        inputs,
        setOutput: mockSetOutput,
        log: mockLog,
        uploadFile: mockUploadFile,
      }),
    ).resolves.not.toThrow();

    expect(mockLog).toHaveBeenCalledWith('Deleting workspace 123456789...');
  });

  it('should throw error when workspaceId is missing', async () => {
    const inputs = {
      outputVariable: 'deletionResult',
    };

    await expect(
      handler({
        inputs,
        setOutput: mockSetOutput,
        log: mockLog,
        uploadFile: mockUploadFile,
      }),
    ).rejects.toThrow('Workspace ID is required');
  });
});

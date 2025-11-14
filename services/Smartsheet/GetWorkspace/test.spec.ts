import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handler } from './handler';

describe('GetWorkspace', () => {
  const mockSetOutput = vi.fn();
  const mockLog = vi.fn();
  const mockUploadFile = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.accessToken = 'test-token';
  });

  it('should get workspace successfully', async () => {
    const inputs = {
      workspaceId: '123456789',
      loadAll: true,
      outputVariable: 'workspaceDetails',
    };

    await expect(
      handler({
        inputs,
        setOutput: mockSetOutput,
        log: mockLog,
        uploadFile: mockUploadFile,
      }),
    ).resolves.not.toThrow();

    expect(mockLog).toHaveBeenCalledWith('Retrieving workspace 123456789...');
  });

  it('should throw error when workspaceId is missing', async () => {
    const inputs = {
      outputVariable: 'workspaceDetails',
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

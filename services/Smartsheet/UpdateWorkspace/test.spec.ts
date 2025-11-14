import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handler } from './handler';

describe('UpdateWorkspace', () => {
  const mockSetOutput = vi.fn();
  const mockLog = vi.fn();
  const mockUploadFile = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.SMARTSHEET_ACCESS_TOKEN = 'test-token';
  });

  it('should update workspace successfully', async () => {
    const inputs = {
      workspaceId: '123456789',
      name: 'Updated Workspace',
      outputVariable: 'updatedWorkspace',
    };

    await expect(
      handler({
        inputs,
        setOutput: mockSetOutput,
        log: mockLog,
        uploadFile: mockUploadFile,
      }),
    ).resolves.not.toThrow();

    expect(mockLog).toHaveBeenCalledWith('Updating workspace 123456789...');
  });

  it('should throw error when workspaceId is missing', async () => {
    const inputs = {
      name: 'Updated Workspace',
      outputVariable: 'updatedWorkspace',
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

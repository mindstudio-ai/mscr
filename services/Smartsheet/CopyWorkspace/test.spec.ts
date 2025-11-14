import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handler } from './handler';

describe('CopyWorkspace', () => {
  const mockSetOutput = vi.fn();
  const mockLog = vi.fn();
  const mockUploadFile = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.SMARTSHEET_ACCESS_TOKEN = 'test-token';
  });

  it('should copy workspace successfully', async () => {
    const inputs = {
      workspaceId: '123456789',
      newName: 'Copy of My Workspace',
      includes: ['data', 'attachments'],
      outputVariable: 'copiedWorkspace',
    };

    await expect(
      handler({
        inputs,
        setOutput: mockSetOutput,
        log: mockLog,
        uploadFile: mockUploadFile,
      }),
    ).resolves.not.toThrow();

    expect(mockLog).toHaveBeenCalledWith('Copying workspace 123456789...');
  });

  it('should throw error when workspaceId is missing', async () => {
    const inputs = {
      newName: 'Copy of My Workspace',
      outputVariable: 'copiedWorkspace',
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

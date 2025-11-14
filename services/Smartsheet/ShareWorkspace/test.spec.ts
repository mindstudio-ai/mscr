import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handler } from './handler';

describe('ShareWorkspace', () => {
  const mockSetOutput = vi.fn();
  const mockLog = vi.fn();
  const mockUploadFile = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.SMARTSHEET_ACCESS_TOKEN = 'test-token';
  });

  it('should share workspace successfully', async () => {
    const inputs = {
      workspaceId: '123456789',
      shares: [
        {
          email: 'user@example.com',
          accessLevel: 'VIEWER',
        },
      ],
      sendEmail: true,
      message: 'Check out this workspace!',
      outputVariable: 'sharingResult',
    };

    await expect(
      handler({
        inputs,
        setOutput: mockSetOutput,
        log: mockLog,
        uploadFile: mockUploadFile,
      }),
    ).resolves.not.toThrow();

    expect(mockLog).toHaveBeenCalledWith('Sharing workspace 123456789...');
  });

  it('should throw error when workspaceId is missing', async () => {
    const inputs = {
      shares: [{ email: 'user@example.com', accessLevel: 'VIEWER' }],
      outputVariable: 'sharingResult',
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

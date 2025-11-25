import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handler } from './handler';

describe('ListWorkspaces', () => {
  const mockSetOutput = vi.fn();
  const mockLog = vi.fn();
  const mockUploadFile = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.accessToken = 'test-token';
  });

  it('should list workspaces successfully', async () => {
    const inputs = {
      includeAll: true,
      outputVariable: 'workspacesList',
    };

    await expect(
      handler({
        inputs,
        setOutput: mockSetOutput,
        log: mockLog,
        uploadFile: mockUploadFile,
      }),
    ).resolves.not.toThrow();

    expect(mockLog).toHaveBeenCalledWith('Listing workspaces...');
  });

  it('should throw error when access token is missing', async () => {
    delete process.env.accessToken;

    const inputs = {
      outputVariable: 'workspacesList',
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

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handler } from './handler';

describe('CreateWorkspace', () => {
  const mockSetOutput = vi.fn();
  const mockLog = vi.fn();
  const mockUploadFile = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.accessToken = 'test-token';
  });

  it('should create workspace successfully', async () => {
    const inputs = {
      name: 'New Workspace',
      outputVariable: 'newWorkspace',
    };

    await expect(
      handler({
        inputs,
        setOutput: mockSetOutput,
        log: mockLog,
        uploadFile: mockUploadFile,
      }),
    ).resolves.not.toThrow();

    expect(mockLog).toHaveBeenCalledWith('Creating workspace New Workspace...');
  });

  it('should throw error when name is missing', async () => {
    const inputs = {
      outputVariable: 'newWorkspace',
    };

    await expect(
      handler({
        inputs,
        setOutput: mockSetOutput,
        log: mockLog,
        uploadFile: mockUploadFile,
      }),
    ).rejects.toThrow('Workspace name is required');
  });
});

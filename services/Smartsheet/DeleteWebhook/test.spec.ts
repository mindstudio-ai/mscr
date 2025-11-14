import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handler } from './handler';

describe('DeleteWebhook', () => {
  const mockSetOutput = vi.fn();
  const mockLog = vi.fn();
  const mockUploadFile = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.SMARTSHEET_ACCESS_TOKEN = 'test-token';
  });

  it('should delete webhook successfully', async () => {
    const inputs = {
      webhookId: '123456789',
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

    expect(mockLog).toHaveBeenCalledWith('Deleting webhook 123456789...');
  });

  it('should throw error when webhookId is missing', async () => {
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
    ).rejects.toThrow('Webhook ID is required');
  });
});

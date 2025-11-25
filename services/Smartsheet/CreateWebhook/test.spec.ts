import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handler } from './handler';

describe('CreateWebhook', () => {
  const mockSetOutput = vi.fn();
  const mockLog = vi.fn();
  const mockUploadFile = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.accessToken = 'test-token';
  });

  it('should create webhook successfully', async () => {
    const inputs = {
      name: 'My Webhook',
      callbackUrl: 'https://example.com/webhook',
      scope: 'sheet',
      scopeObjectId: '987654321',
      events: ['*.*'],
      version: 1,
      outputVariable: 'newWebhook',
    };

    await expect(
      handler({
        inputs,
        setOutput: mockSetOutput,
        log: mockLog,
        uploadFile: mockUploadFile,
      }),
    ).resolves.not.toThrow();

    expect(mockLog).toHaveBeenCalledWith('Creating webhook My Webhook...');
  });

  it('should throw error when name is missing', async () => {
    const inputs = {
      callbackUrl: 'https://example.com/webhook',
      scope: 'sheet',
      scopeObjectId: '987654321',
      events: ['*.*'],
      outputVariable: 'newWebhook',
    };

    await expect(
      handler({
        inputs,
        setOutput: mockSetOutput,
        log: mockLog,
        uploadFile: mockUploadFile,
      }),
    ).rejects.toThrow('Webhook name is required');
  });
});

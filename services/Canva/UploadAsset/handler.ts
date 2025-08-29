import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

export const handler = async ({
  inputs,
  setOutput,
  log,
  uploadFile,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { token } = process.env;
  if (!token) {
    throw new Error(
      'Missing Canva API token. Please check your connection settings.',
    );
  }

  const { assetName, filePath, outputVariable } = inputs;
  if (!assetName) {
    throw new Error('Asset name is required');
  }
  if (!filePath) {
    throw new Error('File path is required');
  }

  log(`Preparing to upload asset: ${assetName}`);

  // Base64 encode the asset name for the metadata header
  const nameBase64 = Buffer.from(assetName).toString('base64');

  // Determine if the file path is a URL or local file path
  const isUrl =
    filePath.startsWith('http://') || filePath.startsWith('https://');

  let fileBuffer: Buffer;
  let mimeType: string;

  // Get file content either from URL or local path
  try {
    if (isUrl) {
      log('Downloading file from URL...');
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`Failed to download file: ${response.statusText}`);
      }
      fileBuffer = Buffer.from(await response.arrayBuffer());

      // Try to determine mime type from URL extension
      const extension = path.extname(new URL(filePath).pathname).toLowerCase();
      mimeType = getMimeType(extension);
    } else {
      log('Reading file from local path...');
      fileBuffer = fs.readFileSync(filePath);

      // Determine mime type from file extension
      const extension = path.extname(filePath).toLowerCase();
      mimeType = getMimeType(extension);
    }

    log(`File loaded successfully (${fileBuffer.length} bytes)`);
  } catch (error) {
    throw new Error(`Failed to read file: ${(error as Error).message}`);
  }

  // Upload the asset to Canva
  log('Uploading asset to Canva...');

  try {
    const response = await fetch(
      'https://api.canva.com/rest/v1/asset-uploads',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/octet-stream',
          'Asset-Upload-Metadata': JSON.stringify({ name_base64: nameBase64 }),
        },
        body: fileBuffer,
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Canva API error (${response.status}): ${errorText}`);
    }

    const initialResult = (await response.json()) as any;
    log(`Upload job created with ID: ${initialResult.job.id}`);

    // Handle asynchronous job
    let jobResult = initialResult;
    let attempts = 0;
    const maxAttempts = 10;

    // If the job is still in progress, poll for completion
    while (jobResult.job.status === 'in_progress' && attempts < maxAttempts) {
      attempts++;

      // Exponential backoff with initial 1s delay
      const delay = Math.min(1000 * Math.pow(1.5, attempts - 1), 10000);
      log(
        `Job in progress, checking again in ${Math.round(delay / 1000)} seconds...`,
      );

      await new Promise((resolve) => setTimeout(resolve, delay));

      const statusResponse = await fetch(
        `https://api.canva.com/rest/v1/asset-uploads/${jobResult.job.id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!statusResponse.ok) {
        const errorText = await statusResponse.text();
        throw new Error(`Failed to check job status: ${errorText}`);
      }

      jobResult = (await statusResponse.json()) as any;
    }

    // Check final job status
    if (jobResult.job.status === 'failed') {
      const errorCode = jobResult.job.error?.code || 'unknown';
      const errorMessage = jobResult.job.error?.message || 'Unknown error';
      throw new Error(`Upload failed: ${errorCode} - ${errorMessage}`);
    }

    if (jobResult.job.status === 'in_progress') {
      throw new Error(
        'Upload job timed out. The asset may still be processing in Canva.',
      );
    }

    // Success!
    log('Asset uploaded successfully to Canva!');

    // Set the output with the asset information
    setOutput(outputVariable, {
      id: jobResult.job.asset.id,
      name: jobResult.job.asset.name,
      createdAt: jobResult.job.asset.created_at,
      updatedAt: jobResult.job.asset.updated_at,
      thumbnail: jobResult.job.asset.thumbnail?.url,
      tags: jobResult.job.asset.tags || [],
    });
  } catch (error) {
    throw new Error(`Failed to upload asset: ${(error as Error).message}`);
  }
};

// Helper function to determine MIME type from file extension
function getMimeType(extension: string): string {
  const mimeTypes: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.mp4': 'video/mp4',
    '.mov': 'video/quicktime',
    '.avi': 'video/x-msvideo',
    '.webm': 'video/webm',
  };

  return mimeTypes[extension] || 'application/octet-stream';
}

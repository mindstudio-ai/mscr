import fetch from 'node-fetch';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  const { token } = process.env;
  if (!token) {
    throw new Error('Missing Canva API token');
  }

  const { fileUrl, designTitle, mimeType, outputVariable } = inputs;

  if (!fileUrl) {
    throw new Error('File URL is required');
  }

  if (!designTitle) {
    throw new Error('Design title is required');
  }

  // Convert design title to Base64
  const titleBase64 = Buffer.from(designTitle).toString('base64');

  // Prepare the import metadata
  const importMetadata: Record<string, string> = {
    title_base64: titleBase64,
  };

  // Add mime type if specified and not auto
  if (mimeType && mimeType !== 'auto') {
    importMetadata.mime_type = mimeType;
  }

  log(`Downloading file from ${fileUrl}...`);

  // Download the file
  const fileResponse = await fetch(fileUrl);
  if (!fileResponse.ok) {
    throw new Error(`Failed to download file: ${fileResponse.statusText}`);
  }

  const fileBuffer = await fileResponse.buffer();
  log(`File downloaded successfully (${fileBuffer.length} bytes)`);

  // Import the design to Canva
  log('Importing design to Canva...');
  const importResponse = await fetch('https://api.canva.com/rest/v1/imports', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/octet-stream',
      'Import-Metadata': JSON.stringify(importMetadata),
    },
    body: fileBuffer,
  });

  if (!importResponse.ok) {
    const errorText = await importResponse.text();
    throw new Error(
      `Failed to import design: ${importResponse.statusText} - ${errorText}`,
    );
  }

  const importResult = (await importResponse.json()) as any;

  // Check if job is in progress and needs polling
  if (importResult.job && importResult.job.status === 'in_progress') {
    log('Import job started. Waiting for completion...');

    // Poll for job completion
    const jobId = importResult.job.id;
    const finalResult = await pollJobStatus(jobId, token);

    log('Design import completed');
    setOutput(outputVariable, finalResult);
  } else {
    // Job completed immediately
    log('Design import completed');
    setOutput(outputVariable, importResult);
  }
};

/**
 * Polls the job status until it completes or fails
 */
async function pollJobStatus(jobId: string, token: string): Promise<any> {
  const maxAttempts = 10;
  const pollingInterval = 2000; // 2 seconds

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    // Wait before polling
    await new Promise((resolve) => setTimeout(resolve, pollingInterval));

    // Check job status
    const response = await fetch(
      `https://api.canva.com/rest/v1/imports/${jobId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to check job status: ${response.statusText}`);
    }

    const result = (await response.json()) as any;

    // If job completed or failed, return the result
    if (result.job.status === 'success' || result.job.status === 'failed') {
      return result;
    }
  }

  throw new Error('Import job timed out after multiple polling attempts');
}

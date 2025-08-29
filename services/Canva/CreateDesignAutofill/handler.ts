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
      'Missing authentication token. Please check your connection settings.',
    );
  }

  const { brandTemplateId, title, dataFields, outputVariable } = inputs;

  if (!brandTemplateId) {
    throw new Error('Brand Template ID is required');
  }

  if (!dataFields || Object.keys(dataFields).length === 0) {
    throw new Error('Data Fields are required to populate the template');
  }

  // Prepare request body
  const requestBody: any = {
    brand_template_id: brandTemplateId,
    data: dataFields,
  };

  // Add title if provided
  if (title) {
    requestBody.title = title;
  }

  log(`Creating design from brand template: ${brandTemplateId}`);

  try {
    // Make request to Canva API
    const response = await fetch('https://api.canva.com/rest/v1/autofills', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = (await response.json()) as any;
      throw new Error(
        `Canva API error (${response.status}): ${errorData.message || 'Unknown error'}`,
      );
    }

    const data = (await response.json()) as any;

    if (!data.job) {
      throw new Error(
        'Invalid response from Canva API: missing job information',
      );
    }

    log(`Design autofill job created with ID: ${data.job.id}`);

    // Check if job is already complete
    if (data.job.status === 'success') {
      log('Design created successfully');

      // Format the output
      const result = {
        jobId: data.job.id,
        status: data.job.status,
        design: data.job.result?.design || null,
      };

      setOutput(outputVariable, result);
      return;
    }

    // If job is still in progress, we need to poll for completion
    if (data.job.status === 'in_progress') {
      log('Design creation in progress. Waiting for completion...');

      // Poll for job completion (max 10 attempts with increasing delay)
      const jobResult = await pollJobStatus(data.job.id, token);

      log('Design created successfully');
      setOutput(outputVariable, jobResult);
      return;
    }

    // If job failed immediately
    if (data.job.status === 'failed') {
      const errorMessage = data.job.error?.message || 'Unknown error';
      throw new Error(`Design creation failed: ${errorMessage}`);
    }
  } catch (error) {
    log(`Error: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
};

/**
 * Polls the job status until completion or failure
 */
async function pollJobStatus(jobId: string, token: string): Promise<any> {
  const maxAttempts = 10;
  let attempt = 0;

  while (attempt < maxAttempts) {
    attempt++;

    // Exponential backoff: 1s, 2s, 4s, 8s, etc.
    const delay = Math.min(1000 * Math.pow(2, attempt - 1), 30000);
    await new Promise((resolve) => setTimeout(resolve, delay));

    const response = await fetch(
      `https://api.canva.com/rest/v1/autofills/${jobId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      const errorData = (await response.json()) as any;
      throw new Error(
        `Error checking job status: ${errorData.message || 'Unknown error'}`,
      );
    }

    const data = (await response.json()) as any;

    if (data.job.status === 'success') {
      return {
        jobId: data.job.id,
        status: data.job.status,
        design: data.job.result?.design || null,
      };
    }

    if (data.job.status === 'failed') {
      const errorMessage = data.job.error?.message || 'Unknown error';
      throw new Error(`Design creation failed: ${errorMessage}`);
    }

    // Continue polling if still in progress
  }

  throw new Error('Design creation timed out after multiple attempts');
}

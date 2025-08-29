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
      'Missing Canva API token. Please check your connection configuration.',
    );
  }

  const { jobId, outputVariable } = inputs;
  if (!jobId) {
    throw new Error('Job ID is required');
  }

  log(`Retrieving design autofill job with ID: ${jobId}`);

  try {
    // Make request to Canva API
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

      if (response.status === 403) {
        throw new Error(
          `Permission denied: ${errorData.message || 'You do not have permission to access this job'}`,
        );
      } else if (response.status === 404) {
        throw new Error(
          `Job not found: ${errorData.message || `Job with ID ${jobId} was not found`}`,
        );
      } else {
        throw new Error(
          `API error (${response.status}): ${errorData.message || 'Unknown error occurred'}`,
        );
      }
    }

    const data = (await response.json()) as any;

    // Log appropriate message based on job status
    if (data.job.status === 'in_progress') {
      log(`Job is still in progress. You may need to check again later.`);
    } else if (data.job.status === 'success') {
      log(
        `Job completed successfully! Design "${data.job.result?.design?.title || 'Untitled'}" is ready.`,
      );
    } else if (data.job.status === 'failed') {
      log(`Job failed: ${data.job.error?.message || 'Unknown error'}`);
    }

    // Set the full response as output
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle any unexpected errors
    if (error instanceof Error) {
      log(`Error retrieving design autofill job: ${error.message}`);
      throw error;
    }
    throw new Error(
      'An unknown error occurred while retrieving the design autofill job',
    );
  }
};

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
    throw new Error(
      'Missing Canva API token. Please check your connection configuration.',
    );
  }

  const { jobId, outputVariable } = inputs;
  if (!jobId) {
    throw new Error(
      'Missing Job ID. Please provide a valid URL import job ID.',
    );
  }

  log(`Checking status of URL import job: ${jobId}`);

  try {
    // Make request to Canva API
    const response = await fetch(
      `https://api.canva.com/rest/v1/url-imports/${jobId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API request failed with status ${response.status}: ${errorText}`,
      );
    }

    const data = (await response.json()) as any;

    // Log appropriate message based on job status
    if (data.job.status === 'in_progress') {
      log(
        'The URL import job is still in progress. You may need to check again later.',
      );
    } else if (data.job.status === 'success') {
      const designCount = data.job.result?.designs?.length || 0;
      log(`URL import completed successfully with ${designCount} design(s).`);
    } else if (data.job.status === 'failed') {
      log(`URL import failed: ${data.job.error?.message || 'Unknown error'}`);
    }

    // Set the output variable with the full response
    setOutput(outputVariable, data);
  } catch (error) {
    log(
      `Error checking URL import job: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};

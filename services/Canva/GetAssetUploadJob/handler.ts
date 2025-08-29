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
      'Missing authentication token. Please check your connection settings.',
    );
  }

  const { jobId, outputVariable } = inputs;
  if (!jobId) {
    throw new Error('Job ID is required');
  }

  log(`Checking status of asset upload job: ${jobId}`);

  try {
    const response = await fetch(
      `https://api.canva.com/rest/v1/asset-uploads/${jobId}`,
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
      log('Asset upload job is still in progress');
    } else if (data.job.status === 'success') {
      log('Asset upload job completed successfully');
      if (data.job.asset) {
        log(`Asset ID: ${data.job.asset.id}, Name: ${data.job.asset.name}`);
      }
    } else if (data.job.status === 'failed') {
      log(
        `Asset upload job failed: ${data.job.error?.message || 'Unknown error'}`,
      );
    }

    // Store the complete response in the output variable
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle any errors that occurred during the API request
    log(
      `Error checking asset upload job: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};

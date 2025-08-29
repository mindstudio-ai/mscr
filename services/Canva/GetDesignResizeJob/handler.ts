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
      'Missing authentication token. Please check your Canva connection settings.',
    );
  }

  const { jobId, outputVariable } = inputs;
  if (!jobId) {
    throw new Error('Job ID is required');
  }

  log(`Retrieving design resize job with ID: ${jobId}`);

  try {
    const response = await fetch(
      `https://api.canva.com/rest/v1/resizes/${jobId}`,
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
        'The design resize job is still in progress. You may need to check again later.',
      );
    } else if (data.job.status === 'success') {
      log(
        `Design resize job completed successfully. Design title: ${data.job.result?.design?.title || 'Untitled'}`,
      );
    } else if (data.job.status === 'failed') {
      log(
        `Design resize job failed: ${data.job.error?.message || 'Unknown error'}`,
      );
    }

    // Set the full response as output
    setOutput(outputVariable, data);
  } catch (error) {
    log(
      `Error retrieving design resize job: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};

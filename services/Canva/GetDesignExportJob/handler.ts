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
      'Missing authentication token. Please check your Canva API credentials.',
    );
  }

  const { exportId, outputVariable } = inputs;
  if (!exportId) {
    throw new Error('Export Job ID is required');
  }

  log(`Checking status of export job: ${exportId}`);

  try {
    const response = await fetch(
      `https://api.canva.com/rest/v1/exports/${exportId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
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
      log(`Export job is still in progress. Check again later.`);
    } else if (data.job.status === 'success') {
      log(
        `Export job completed successfully. ${data.job.urls.length} file(s) available for download.`,
      );
    } else if (data.job.status === 'failed') {
      log(`Export job failed: ${data.job.error.message}`);
    }

    // Set the full response as output to give users complete information
    setOutput(outputVariable, data);
  } catch (error) {
    log(
      `Error retrieving export job: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};

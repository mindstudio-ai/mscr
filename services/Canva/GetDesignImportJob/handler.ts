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

  const { jobId, outputVariable } = inputs;
  if (!jobId) {
    throw new Error(
      'Missing Job ID. Please provide a valid design import job ID.',
    );
  }

  log(`Fetching status for design import job: ${jobId}`);

  try {
    // Make request to Canva API
    const response = await fetch(
      `https://api.canva.com/rest/v1/imports/${jobId}`,
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
      throw new Error(`Canva API error (${response.status}): ${errorText}`);
    }

    const data = (await response.json()) as any;

    // Log appropriate message based on job status
    if (data.job.status === 'in_progress') {
      log('Design import job is still in progress. Please check again later.');
    } else if (data.job.status === 'success') {
      const designCount = data.job.result?.designs?.length || 0;
      log(
        `Design import job completed successfully with ${designCount} design(s).`,
      );
    } else if (data.job.status === 'failed') {
      log(
        `Design import job failed: ${data.job.error?.message || 'Unknown error'}`,
      );
    }

    // Set the entire response as the output
    setOutput(outputVariable, data);
  } catch (error) {
    log(`Error fetching design import job: ${(error as Error).message}`);
    throw error;
  }
};

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
  // Extract inputs
  const { title, url, mimeType, outputVariable } = inputs;

  // Validate required environment variables
  const { token } = process.env;
  if (!token) {
    throw new Error(
      'Missing Canva API token. Please check your connection settings.',
    );
  }

  // Log the start of the process
  log(`Starting import of design from URL: ${url}`);

  // Prepare request body
  const requestBody: Record<string, string> = {
    title,
    url,
  };

  // Only include mime_type if it's provided
  if (mimeType) {
    requestBody.mime_type = mimeType;
    log(`Using specified file type: ${mimeType}`);
  } else {
    log('File type will be auto-detected by Canva');
  }

  try {
    // Make the API request to Canva
    const response = await fetch('https://api.canva.com/rest/v1/url-imports', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    // Handle API errors
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Canva API error (${response.status}): ${errorText}`);
    }

    // Parse the response
    const result = (await response.json()) as any;

    // Log the job status
    if (result.job.status === 'in_progress') {
      log(
        `Import job created successfully. Job ID: ${result.job.id}. Status: In Progress`,
      );
      log(
        'The import job is being processed by Canva. You can check its status later.',
      );
    } else if (result.job.status === 'success') {
      log(`Import job completed successfully. Job ID: ${result.job.id}`);
      if (result.job.result?.designs?.length > 0) {
        const design = result.job.result.designs[0];
        log(`Created design: "${design.title}" (ID: ${design.id})`);
      }
    } else if (result.job.status === 'failed') {
      log(
        `Import job failed. Error: ${result.job.error?.message || 'Unknown error'}`,
      );
    }

    // Set the output variable with the full job details
    setOutput(outputVariable, result);
  } catch (error) {
    // Handle any errors that occurred during the request
    const errorMessage = error instanceof Error ? error.message : String(error);
    log(`Error importing design: ${errorMessage}`);
    throw error;
  }
};

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

  const { title, url, mimeType, outputVariable } = inputs;

  if (!title) {
    throw new Error('Design title is required');
  }

  if (!url) {
    throw new Error('File URL is required');
  }

  // Prepare request body
  const requestBody: Record<string, string> = {
    title,
    url,
  };

  // Only include mime_type if it's provided
  if (mimeType) {
    requestBody.mime_type = mimeType;
    log(
      `Creating Canva design "${title}" from URL with specified file type: ${mimeType}`,
    );
  } else {
    log(
      `Creating Canva design "${title}" from URL with auto-detected file type`,
    );
  }

  try {
    // Make the API request to create the import job
    const response = await fetch('https://api.canva.com/rest/v1/url-imports', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Canva API error (${response.status}): ${errorText}`);
    }

    const result = (await response.json()) as any;

    // Log appropriate message based on job status
    if (result.job.status === 'in_progress') {
      log(
        `Import job created successfully. Job ID: ${result.job.id}. Status: In Progress`,
      );
    } else if (result.job.status === 'success') {
      const design = result.job.result.designs[0];
      log(
        `Design "${design.title}" created successfully! Design ID: ${design.id}`,
      );
    } else if (result.job.status === 'failed') {
      log(`Import job failed: ${result.job.error.message}`);
    }

    // Set the output variable with the complete job result
    setOutput(outputVariable, result);
  } catch (error) {
    // Handle any errors that occurred during the API request
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    log(`Error creating Canva design: ${errorMessage}`);
    throw error;
  }
};

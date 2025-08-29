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
  const { assetName, assetUrl, outputVariable } = inputs;

  // Get the bearer token from environment variables
  const token = process.env.token;
  if (!token) {
    throw new Error(
      'Missing authentication token. Please check your Canva connection settings.',
    );
  }

  // Log the start of the upload process
  log(`Starting upload of asset "${assetName}" from URL: ${assetUrl}`);

  try {
    // Make the API request to Canva
    const response = await fetch(
      'https://api.canva.com/rest/v1/url-asset-uploads',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: assetName,
          url: assetUrl,
        }),
      },
    );

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Canva API error (${response.status}): ${errorText}`);
    }

    // Parse the response
    const result = (await response.json()) as any;

    // Log the job status
    const jobStatus = result.job?.status || 'unknown';
    const jobId = result.job?.id || 'unknown';

    log(`Asset upload job created with ID: ${jobId}`);
    log(`Current job status: ${jobStatus}`);

    if (jobStatus === 'failed' && result.job?.error) {
      log(`Upload failed: ${result.job.error.message}`);
    } else if (jobStatus === 'success') {
      log(`Asset successfully uploaded to Canva!`);
      if (result.job?.asset?.id) {
        log(`Asset ID: ${result.job.asset.id}`);
      }
    } else {
      log(
        `The upload job is in progress. You can check the status later using the job ID.`,
      );
    }

    // Set the output variable with the full job details
    setOutput(outputVariable, result);
  } catch (error) {
    // Handle any errors that occurred during the request
    const errorMessage = error instanceof Error ? error.message : String(error);
    log(`Error uploading asset: ${errorMessage}`);
    throw error;
  }
};

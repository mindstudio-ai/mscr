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
  // Extract API key from environment variables
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your HeyReach API Key in the service settings.',
    );
  }

  // Extract inputs
  const { campaignId, outputVariable } = inputs;
  if (!campaignId) {
    throw new Error('Campaign ID is required');
  }

  log(`Resuming HeyReach campaign with ID: ${campaignId}`);

  try {
    // Make request to HeyReach API
    const response = await fetch(
      `https://api.heyreach.io/api/public/campaign/Resume?campaignId=${campaignId}`,
      {
        method: 'POST',
        headers: {
          'X-API-KEY': apiKey,
          Accept: 'text/plain',
        },
      },
    );

    // Handle different response statuses
    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      const errorMessage = errorBody?.errorMessage || 'Unknown error';

      switch (response.status) {
        case 400:
          throw new Error(`Bad Request: ${errorMessage}`);
        case 401:
          throw new Error('Unauthorized: Invalid API key');
        case 404:
          throw new Error(`Campaign not found: ${errorMessage}`);
        case 429:
          throw new Error('Too many requests. Please try again later.');
        default:
          throw new Error(
            `Request failed with status ${response.status}: ${errorMessage}`,
          );
      }
    }

    // Parse successful response
    const data = await response.json();
    log('Campaign resumed successfully');

    // Set output variable with the response data
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle any unexpected errors
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`An unexpected error occurred: ${String(error)}`);
  }
};

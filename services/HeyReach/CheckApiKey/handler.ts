export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { apiKey } = process.env;
  const { outputVariable } = inputs;

  // Validate API key is provided
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please add your HeyReach API key in the connector settings.',
    );
  }

  log('Checking if your HeyReach API key is valid...');

  try {
    // Make request to HeyReach API to check if the API key is valid
    const response = await fetch(
      'https://api.heyreach.io/api/public/auth/CheckApiKey',
      {
        method: 'GET',
        headers: {
          'X-API-KEY': apiKey,
          Accept: 'text/plain',
        },
      },
    );

    // Handle different response statuses
    if (response.status === 200) {
      log('API key is valid and working properly.');
      setOutput(outputVariable, true);
    } else if (response.status === 401) {
      log('API key is invalid. Please check your API key and try again.');
      setOutput(outputVariable, false);
    } else if (response.status === 429) {
      throw new Error('Too many requests. Please try again later.');
    } else {
      throw new Error(
        `Unexpected response from HeyReach API: ${response.status} ${response.statusText}`,
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      // If we already created a custom error message, throw it directly
      if (
        error.message.includes('Too many requests') ||
        error.message.includes('Unexpected response')
      ) {
        throw error;
      }
      // Otherwise, it's likely a network or other unexpected error
      throw new Error(`Failed to check API key: ${error.message}`);
    }
    throw new Error('An unknown error occurred while checking your API key.');
  }
};

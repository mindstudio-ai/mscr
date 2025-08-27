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
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing Apollo API Key. Please check your connection settings.',
    );
  }

  const { accountId, outputVariable } = inputs;
  if (!accountId) {
    throw new Error('Account ID is required');
  }

  log(`Retrieving account information for ID: ${accountId}`);

  try {
    // Make request to Apollo API
    const response = await fetch(
      `https://api.apollo.io/api/v1/accounts/${accountId}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Api-Key': apiKey,
          'Cache-Control': 'no-cache',
        },
      },
    );

    // Check for HTTP errors
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized: Invalid API key');
      } else if (response.status === 403) {
        throw new Error('Forbidden: This endpoint requires a master API key');
      } else if (response.status === 422) {
        throw new Error(
          'Unprocessable Entity: The request contains invalid parameters',
        );
      } else {
        throw new Error(
          `Apollo API error: ${response.status} ${response.statusText}`,
        );
      }
    }

    // Parse response
    const data = await response.json();
    log('Successfully retrieved account information');

    // Set the output variable with the account data
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle any errors that occurred during the request
    if (error instanceof Error) {
      log(`Error retrieving account information: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred');
  }
};

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  const { apiKey } = process.env;
  const { outputVariable } = inputs;

  // Validate API key
  if (!apiKey) {
    throw new Error(
      'Missing Apollo API Key. Please add your API key in the connector settings.',
    );
  }

  log('Fetching account stages from Apollo...');

  try {
    // Make request to Apollo API
    const response = await fetch(
      'https://api.apollo.io/api/v1/account_stages',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          Authorization: apiKey,
        },
      },
    );

    // Handle HTTP errors
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication failed. Please check your API key.');
      } else if (response.status === 403) {
        throw new Error(
          'Permission denied. This endpoint requires a master API key.',
        );
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(
          `Apollo API request failed with status: ${response.status}`,
        );
      }
    }

    // Parse response
    const data = await response.json();

    if (!data.account_stages || !Array.isArray(data.account_stages)) {
      throw new Error('Unexpected response format from Apollo API');
    }

    log(`Successfully retrieved ${data.account_stages.length} account stages`);

    // Set output
    setOutput(outputVariable, data.account_stages);
  } catch (error) {
    // Handle and rethrow errors
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred while fetching account stages');
  }
};

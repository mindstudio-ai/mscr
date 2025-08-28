export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
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

  // Prepare the request URL
  const url = `https://api.heyreach.io/api/public/campaign/GetById?campaignId=${campaignId}`;

  log(`Retrieving campaign with ID: ${campaignId}`);

  try {
    // Make the API request
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-API-KEY': apiKey,
        Accept: 'application/json',
      },
    });

    // Handle different response statuses
    if (response.status === 401) {
      throw new Error(
        'Unauthorized: Invalid API key or insufficient permissions',
      );
    } else if (response.status === 404) {
      throw new Error(`Campaign with ID ${campaignId} not found`);
    } else if (response.status === 429) {
      throw new Error('Too many requests. Please try again later.');
    } else if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    // Parse the response
    const campaignData = await response.json();
    log('Campaign data retrieved successfully');

    // Set the output
    setOutput(outputVariable, campaignData);
  } catch (error) {
    // Handle any errors that occurred during the request
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred');
  }
};

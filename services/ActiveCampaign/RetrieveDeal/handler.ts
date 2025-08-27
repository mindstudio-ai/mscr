export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  // Extract inputs
  const { dealId, outputVariable } = inputs;

  // Validate environment variables
  const { accessToken, accountIdentifier } = process.env;

  if (!accessToken) {
    throw new Error(
      'Missing API Key. Please check your ActiveCampaign API Key configuration.',
    );
  }

  if (!accountIdentifier) {
    throw new Error(
      'Missing Account URL. Please check your ActiveCampaign Account URL configuration.',
    );
  }

  // Validate required inputs
  if (!dealId) {
    throw new Error('Deal ID is required.');
  }

  // Construct the API URL
  // Remove trailing slash from accountIdentifier if present
  const baseUrl = accountIdentifier.endsWith('/')
    ? accountIdentifier.slice(0, -1)
    : accountIdentifier;

  const url = `${baseUrl}/api/3/deals/${dealId}`;

  log(`Retrieving deal with ID: ${dealId}`);

  try {
    // Make the API request
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Api-Token': accessToken,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      if (response.status === 404) {
        throw new Error(`Deal with ID ${dealId} not found.`);
      } else if (response.status === 401 || response.status === 403) {
        throw new Error(
          'Authentication failed. Please check your API Key and Account URL.',
        );
      } else {
        throw new Error(
          `API request failed: ${response.status} ${response.statusText}. ${errorText}`,
        );
      }
    }

    // Parse the response
    const data = await response.json();

    log('Deal retrieved successfully');

    // Set the output variable with the deal data
    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred while retrieving the deal.');
  }
};

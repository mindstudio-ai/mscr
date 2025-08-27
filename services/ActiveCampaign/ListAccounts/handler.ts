export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  // Get environment variables
  const { accessToken, accountIdentifier } = process.env;

  // Validate required environment variables
  if (!accessToken) {
    throw new Error(
      'Missing API Key. Please add your ActiveCampaign API Key in the connector settings.',
    );
  }

  if (!accountIdentifier) {
    throw new Error(
      'Missing Account URL. Please add your ActiveCampaign Account URL in the connector settings.',
    );
  }

  // Extract inputs
  const { search, countDeals, outputVariable } = inputs;

  // Build the API URL with query parameters
  let apiUrl = `${accountIdentifier}/api/3/accounts`;
  const queryParams = new URLSearchParams();

  if (search) {
    queryParams.append('search', search);
    log(`Filtering accounts by name: "${search}"`);
  }

  if (countDeals === 'true') {
    queryParams.append('count_deals', 'true');
    log('Including contact and deal counts for accounts');
  }

  const queryString = queryParams.toString();
  if (queryString) {
    apiUrl += `?${queryString}`;
  }

  // Set up request options
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Api-Token': accessToken,
    },
  };

  try {
    log('Fetching accounts from ActiveCampaign...');

    // Make the API request
    const response = await fetch(apiUrl, options);

    // Check for HTTP errors
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API request failed with status ${response.status}: ${errorText}`,
      );
    }

    // Parse the response
    const data = await response.json();

    // Extract accounts from response
    const accounts = data.accounts || [];

    log(`Successfully retrieved ${accounts.length} accounts`);

    // Set the output variable with the accounts data
    setOutput(outputVariable, accounts);
  } catch (error) {
    // Handle errors
    log(`Error fetching accounts: ${error.message}`);
    throw error;
  }
};

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  // Get API key from environment variables
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing Apollo API Key. Please add your API key in the connector settings.',
    );
  }

  // Extract inputs
  const {
    accountId,
    name,
    domain,
    ownerId,
    accountStageId,
    rawAddress,
    phone,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!accountId) {
    throw new Error('Account ID is required');
  }

  if (!outputVariable) {
    throw new Error('Output variable name is required');
  }

  // Construct the base URL
  const baseUrl = 'https://api.apollo.io/api/v1/accounts';
  const url = `${baseUrl}/${accountId}`;

  // Build query parameters from optional inputs
  const queryParams: Record<string, string> = {};

  if (name) {
    queryParams.name = name;
  }
  if (domain) {
    queryParams.domain = domain;
  }
  if (ownerId) {
    queryParams.owner_id = ownerId;
  }
  if (accountStageId) {
    queryParams.account_stage_id = accountStageId;
  }
  if (rawAddress) {
    queryParams.raw_address = rawAddress;
  }
  if (phone) {
    queryParams.phone = phone;
  }

  // Construct query string
  const queryString = new URLSearchParams(queryParams).toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  // Prepare request options
  const options = {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  };

  log(`Updating Apollo account with ID: ${accountId}`);

  try {
    // Make the API request
    const response = await fetch(fullUrl, options);

    // Handle HTTP errors
    if (!response.ok) {
      const errorText = await response.text();
      if (response.status === 401) {
        throw new Error('Authentication failed. Please check your API key.');
      } else if (response.status === 403) {
        throw new Error(
          "This endpoint requires a master API key. Your current key doesn't have sufficient permissions.",
        );
      } else if (response.status === 422) {
        throw new Error(`Validation error: ${errorText}`);
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(`Apollo API error (${response.status}): ${errorText}`);
      }
    }

    // Parse the response
    const data = await response.json();

    log('Account updated successfully');

    // Set the output variable with the response data
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle any unexpected errors
    log(`Error updating account: ${error.message}`);
    throw error;
  }
};

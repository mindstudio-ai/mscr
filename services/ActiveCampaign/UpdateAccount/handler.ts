export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  // Extract environment variables
  const { accessToken, accountIdentifier } = process.env;

  // Validate environment variables
  if (!accessToken) {
    throw new Error(
      'Missing API Key. Please add your ActiveCampaign API Key in the connector settings.',
    );
  }

  if (!accountIdentifier) {
    throw new Error(
      'Missing Account URL. Please add your ActiveCampaign Base Account URL in the connector settings.',
    );
  }

  // Extract inputs
  const { accountId, name, accountUrl, owner, customFields, outputVariable } =
    inputs;

  // Validate required inputs
  if (!accountId) {
    throw new Error('Account ID is required');
  }

  if (!outputVariable) {
    throw new Error('Output variable name is required');
  }

  // Prepare the request body
  const account: Record<string, any> = {};

  // Add optional fields if they exist
  if (name) {
    account.name = name;
  }
  if (accountUrl) {
    account.accountUrl = accountUrl;
  }
  if (owner) {
    account.owner = parseInt(owner, 10);
  }

  // Add custom fields if provided
  if (customFields && Array.isArray(customFields) && customFields.length > 0) {
    account.fields = customFields;
  }

  // Construct the API URL
  const baseUrl = accountIdentifier.endsWith('/')
    ? accountIdentifier.slice(0, -1)
    : accountIdentifier;

  const apiUrl = `${baseUrl}/api/3/accounts/${accountId}`;

  log(`Updating account with ID: ${accountId}`);

  try {
    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Api-Token': accessToken,
      },
      body: JSON.stringify({ account }),
    });

    // Parse the response
    const responseData = await response.json();

    // Check for errors
    if (!response.ok) {
      const errorMessage = responseData.message || 'Unknown error occurred';
      throw new Error(`API Error (${response.status}): ${errorMessage}`);
    }

    log(`Account updated successfully`);

    // Set the output variable
    setOutput(outputVariable, responseData);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error updating account: ${error.message}`);
      throw error;
    }
    throw new Error(`Unknown error occurred: ${String(error)}`);
  }
};

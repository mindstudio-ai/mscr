export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  const { accessToken, accountIdentifier } = process.env;

  // Validate required environment variables
  if (!accessToken) {
    throw new Error(
      'Missing API Key. Please check your ActiveCampaign API Key in the connector settings.',
    );
  }

  if (!accountIdentifier) {
    throw new Error(
      'Missing Account URL. Please check your ActiveCampaign Base Account URL in the connector settings.',
    );
  }

  const { contactId, accountId, outputVariable } = inputs;

  // Build the API URL
  let apiUrl = `${accountIdentifier}/api/3/accountContacts`;

  // Add query parameters if filters are provided
  const queryParams = new URLSearchParams();
  if (contactId) {
    queryParams.append('filters[contact]', contactId);
  }
  if (accountId) {
    queryParams.append('filters[account]', accountId);
  }

  // Append query parameters to URL if any exist
  if (queryParams.toString()) {
    apiUrl += `?${queryParams.toString()}`;
  }

  log(`Fetching account-contact associations from ActiveCampaign...`);

  try {
    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Api-Token': accessToken,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API request failed with status ${response.status}: ${errorText}`,
      );
    }

    const data = await response.json();

    const associationCount = data.accountContacts?.length || 0;
    log(
      `Successfully retrieved ${associationCount} account-contact associations.`,
    );

    // Set the output variable with the full response
    setOutput(outputVariable, data);
  } catch (error) {
    log(`Error fetching account-contact associations: ${error.message}`);
    throw error;
  }
};

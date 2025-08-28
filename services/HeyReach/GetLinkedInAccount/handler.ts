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
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please check your HeyReach API key configuration.',
    );
  }

  const { accountId, outputVariable } = inputs;
  if (!accountId) {
    throw new Error(
      'Missing Account ID. Please provide a LinkedIn account ID.',
    );
  }

  log(`Retrieving LinkedIn account with ID: ${accountId}`);

  try {
    const response = await fetch(
      `https://api.heyreach.io/api/public/li_account/GetById?accountId=${accountId}`,
      {
        method: 'GET',
        headers: {
          'X-API-KEY': apiKey,
          Accept: 'application/json',
        },
      },
    );

    // Handle different response statuses
    if (response.status === 401) {
      throw new Error(
        'Unauthorized: Invalid API key. Please check your HeyReach API key.',
      );
    } else if (response.status === 404) {
      throw new Error(`LinkedIn account with ID ${accountId} not found.`);
    } else if (response.status === 429) {
      throw new Error('Too many requests. Please try again later.');
    } else if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const accountData = await response.json();
    log('Successfully retrieved LinkedIn account information');

    // Set the output variable with the account data
    setOutput(outputVariable, accountData);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error(
      'An unknown error occurred while retrieving the LinkedIn account',
    );
  }
};

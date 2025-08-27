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
  // Extract inputs
  const { accountId, outputVariable } = inputs;

  // Extract environment variables
  const { accessToken, accountIdentifier } = process.env;

  // Validate required environment variables
  if (!accessToken) {
    throw new Error('Missing API Key. Please check your connection settings.');
  }

  if (!accountIdentifier) {
    throw new Error(
      'Missing Account URL. Please check your connection settings.',
    );
  }

  // Validate required inputs
  if (!accountId) {
    throw new Error('Account ID is required');
  }

  // Ensure the account identifier doesn't have a trailing slash
  const baseUrl = accountIdentifier.endsWith('/')
    ? accountIdentifier.slice(0, -1)
    : accountIdentifier;

  // Construct the API URL
  const url = `${baseUrl}/api/3/accounts/${accountId}`;

  log(`Retrieving account with ID: ${accountId}`);

  try {
    // Make the API request
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Api-Token': accessToken,
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API request failed with status ${response.status}: ${errorText}`,
      );
    }

    // Parse the response
    const data = await response.json();

    log('Successfully retrieved account details');

    // Set the output variable with the account data
    setOutput(outputVariable, data.account);
  } catch (error) {
    // Handle errors
    const errorMessage = error instanceof Error ? error.message : String(error);
    log(`Error retrieving account: ${errorMessage}`);
    throw error;
  }
};

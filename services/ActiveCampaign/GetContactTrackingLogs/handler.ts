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
  // Extract inputs and environment variables
  const { contactId, outputVariable } = inputs;
  const { accessToken, accountIdentifier } = process.env;

  // Validate required inputs and environment variables
  if (!contactId) {
    throw new Error('Contact ID is required');
  }

  if (!accessToken) {
    throw new Error('API Key (accessToken) is not configured');
  }

  if (!accountIdentifier) {
    throw new Error('Account URL (accountIdentifier) is not configured');
  }

  // Ensure the account identifier doesn't have a trailing slash
  const baseUrl = accountIdentifier.endsWith('/')
    ? accountIdentifier.slice(0, -1)
    : accountIdentifier;

  // Construct the API URL
  const apiUrl = `${baseUrl}/api/3/contacts/${contactId}/trackingLogs`;

  log(`Retrieving tracking logs for contact ID: ${contactId}`);

  try {
    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Api-Token': accessToken,
      },
    });

    // Handle HTTP errors
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Contact with ID ${contactId} not found`);
      } else if (response.status === 401 || response.status === 403) {
        throw new Error('Authentication failed. Please check your API key.');
      } else {
        throw new Error(`API request failed with status: ${response.status}`);
      }
    }

    // Parse the response
    const data = await response.json();

    log(`Successfully retrieved tracking logs for contact ID: ${contactId}`);

    // Set the output variable with the tracking logs data
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle any errors that occurred during the request
    if (error instanceof Error) {
      log(`Error retrieving tracking logs: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred while retrieving tracking logs');
  }
};

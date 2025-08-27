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
  const { contactId, outputVariable } = inputs;

  // Extract environment variables
  const { accessToken, accountIdentifier } = process.env;

  // Validate required environment variables
  if (!accessToken) {
    throw new Error('API Key (accessToken) is required but not provided');
  }

  if (!accountIdentifier) {
    throw new Error(
      'Base Account URL (accountIdentifier) is required but not provided',
    );
  }

  // Validate required inputs
  if (!contactId) {
    throw new Error('Contact ID is required');
  }

  // Construct the API URL
  const baseUrl = accountIdentifier.endsWith('/')
    ? accountIdentifier.slice(0, -1)
    : accountIdentifier;

  const url = `${baseUrl}/api/3/contacts/${contactId}/contactData`;

  log(`Retrieving contact data for contact ID: ${contactId}`);

  try {
    // Make the API request
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Api-Token': accessToken,
      },
    });

    // Handle API response
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Contact with ID ${contactId} not found`);
      } else {
        const errorText = await response.text();
        throw new Error(
          `API request failed with status ${response.status}: ${errorText}`,
        );
      }
    }

    // Parse the response
    const data = await response.json();

    log(`Successfully retrieved contact data`);

    // Set the output variable with the contact data
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      log(`Error retrieving contact data: ${error.message}`);
      throw error;
    } else {
      log(`Unknown error occurred while retrieving contact data`);
      throw new Error('Unknown error occurred while retrieving contact data');
    }
  }
};

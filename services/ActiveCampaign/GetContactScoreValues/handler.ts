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
      'Missing Account URL. Please add your ActiveCampaign Account URL in the connector settings.',
    );
  }

  // Extract inputs
  const { contactId, outputVariable } = inputs;

  // Validate inputs
  if (!contactId) {
    throw new Error('Contact ID is required');
  }

  // Build the API URL
  const baseUrl = accountIdentifier.endsWith('/')
    ? accountIdentifier.slice(0, -1)
    : accountIdentifier;

  const url = `${baseUrl}/api/3/contacts/${contactId}/scoreValues`;

  log(`Retrieving score values for contact ID: ${contactId}`);

  try {
    // Make the API request
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Api-Token': accessToken,
        Accept: 'application/json',
      },
    });

    // Handle response status
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

    log(`Successfully retrieved score values for contact ID: ${contactId}`);

    // Set the output
    setOutput(outputVariable, data.scoreValues);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred');
  }
};

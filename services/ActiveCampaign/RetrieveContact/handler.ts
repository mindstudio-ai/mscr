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

  // Extract inputs
  const { contactId, outputVariable } = inputs;
  if (!contactId) {
    throw new Error('Contact ID is required.');
  }

  try {
    // Construct the API URL
    const baseUrl = accountIdentifier.endsWith('/')
      ? accountIdentifier.slice(0, -1)
      : accountIdentifier;
    const url = `${baseUrl}/api/3/contacts/${contactId}`;

    log(`Retrieving contact with ID: ${contactId}`);

    // Make the API request
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Api-Token': accessToken,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    // Check for HTTP errors
    if (!response.ok) {
      const errorText = await response.text();
      if (response.status === 404) {
        throw new Error(`Contact with ID ${contactId} not found.`);
      } else if (response.status === 401 || response.status === 403) {
        throw new Error(
          'Authentication failed. Please check your API Key and Account URL.',
        );
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(`API error (${response.status}): ${errorText}`);
      }
    }

    // Parse the response
    const data = await response.json();

    log(
      `Successfully retrieved contact: ${data.contact?.firstName || ''} ${data.contact?.lastName || ''}`,
    );

    // Set the output variable with the full response
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle any unexpected errors
    if (error instanceof Error) {
      log(`Error retrieving contact: ${error.message}`);
      throw error;
    }
    throw new Error(
      'An unexpected error occurred while retrieving the contact.',
    );
  }
};

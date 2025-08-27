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

  // Validate environment variables
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

  const { contactId, outputVariable } = inputs;

  // Validate inputs
  if (!contactId) {
    throw new Error('Contact ID is required');
  }

  // Ensure the account identifier doesn't have a trailing slash
  const baseUrl = accountIdentifier.endsWith('/')
    ? accountIdentifier.slice(0, -1)
    : accountIdentifier;

  // Construct the API URL
  const url = `${baseUrl}/api/3/contacts/${contactId}/fieldValues`;

  log(`Retrieving field values for contact ID: ${contactId}`);

  try {
    // Make the API request
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Api-Token': accessToken,
        Accept: 'application/json',
      },
    });

    // Check for HTTP errors
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication failed. Please check your API Key.');
      } else if (response.status === 404) {
        throw new Error(`Contact with ID ${contactId} not found.`);
      } else {
        throw new Error(`API request failed with status: ${response.status}`);
      }
    }

    // Parse the response
    const data = await response.json();

    // Validate the response structure
    if (!data || !data.fieldValues) {
      throw new Error('Unexpected API response format');
    }

    log(`Successfully retrieved ${data.fieldValues.length} field values`);

    // Set the output variable with the field values
    setOutput(outputVariable, data.fieldValues);
  } catch (error) {
    // Handle any errors that occurred during the request
    if (error instanceof Error) {
      throw new Error(
        `Failed to retrieve contact field values: ${error.message}`,
      );
    } else {
      throw new Error(
        'An unknown error occurred while retrieving contact field values',
      );
    }
  }
};

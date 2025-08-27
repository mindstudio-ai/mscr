export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  // Extract inputs and environment variables
  const { associationId, outputVariable } = inputs;
  const { accessToken, accountIdentifier } = process.env;

  // Validate required environment variables
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

  // Validate required inputs
  if (!associationId) {
    throw new Error('Association ID is required.');
  }

  // Ensure accountIdentifier doesn't end with a slash
  const baseUrl = accountIdentifier.endsWith('/')
    ? accountIdentifier.slice(0, -1)
    : accountIdentifier;

  // Construct the API URL
  const url = `${baseUrl}/api/3/accountContacts/${associationId}`;

  // Log the request
  log(`Retrieving association with ID: ${associationId}`);

  try {
    // Make the API request
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Api-Token': accessToken,
        Accept: 'application/json',
      },
    });

    // Handle HTTP errors
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Association with ID ${associationId} not found.`);
      } else {
        const errorText = await response.text();
        throw new Error(
          `API request failed with status ${response.status}: ${errorText}`,
        );
      }
    }

    // Parse the response
    const data = await response.json();

    // Extract the accountContact object
    if (!data.accountContact) {
      throw new Error(
        "Unexpected response format: 'accountContact' not found in response.",
      );
    }

    log(`Successfully retrieved association details for ID: ${associationId}`);

    // Set the output variable with the association details
    setOutput(outputVariable, data.accountContact);
  } catch (error) {
    // Handle any errors
    log(`Error retrieving association: ${error.message}`);
    throw error;
  }
};

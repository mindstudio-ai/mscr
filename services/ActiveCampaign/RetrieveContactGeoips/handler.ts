export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  // Get environment variables
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

  // Get and validate inputs
  const { contactId, outputVariable } = inputs;

  if (!contactId) {
    throw new Error('Contact ID is required');
  }

  // Ensure the account identifier doesn't end with a slash
  const baseUrl = accountIdentifier.endsWith('/')
    ? accountIdentifier.slice(0, -1)
    : accountIdentifier;

  // Construct API URL
  const apiUrl = `${baseUrl}/api/3/contacts/${contactId}/geoIps`;

  log(`Retrieving geo-IP information for contact ID: ${contactId}`);

  try {
    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Api-Token': accessToken,
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Contact with ID ${contactId} not found`);
      }

      const errorText = await response.text();
      throw new Error(
        `API request failed with status ${response.status}: ${errorText}`,
      );
    }

    // Parse the response
    const data = await response.json();

    log(
      `Successfully retrieved geo-IP information. Found ${data.geoIps?.length || 0} records.`,
    );

    // Set the output variable with the geo-IPs data
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle any errors that occurred during the request
    log(
      `Error retrieving geo-IP information: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};

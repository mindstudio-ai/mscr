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

  // Validate required environment variables
  if (!accessToken) {
    throw new Error(
      'Missing API Key. Please configure the ActiveCampaign API Key in the connector settings.',
    );
  }

  if (!accountIdentifier) {
    throw new Error(
      'Missing Account URL. Please configure the ActiveCampaign Account URL in the connector settings.',
    );
  }

  // Validate required inputs
  if (!contactId) {
    throw new Error('Missing Contact ID. Please provide a valid contact ID.');
  }

  // Ensure the account identifier doesn't have a trailing slash
  const baseUrl = accountIdentifier.endsWith('/')
    ? accountIdentifier.slice(0, -1)
    : accountIdentifier;

  // Construct the API endpoint URL
  const apiUrl = `${baseUrl}/api/3/contacts/${contactId}/deals`;

  log(`Retrieving deals for contact ID: ${contactId}`);

  try {
    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Api-Token': accessToken,
        Accept: 'application/json',
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Contact with ID ${contactId} not found.`);
      } else {
        const errorText = await response.text();
        throw new Error(
          `API request failed with status ${response.status}: ${errorText}`,
        );
      }
    }

    // Parse the response
    const data = await response.json();

    // Log success message
    const dealCount = data.deals ? data.deals.length : 0;
    log(
      `Successfully retrieved ${dealCount} deals for contact ID: ${contactId}`,
    );

    // Set the output variable with the deals data
    setOutput(outputVariable, data.deals || []);
  } catch (error) {
    // Handle any errors that occurred during the request
    if (error instanceof Error) {
      log(`Error retrieving deals: ${error.message}`);
      throw error;
    }
    throw new Error(`Unknown error occurred: ${String(error)}`);
  }
};

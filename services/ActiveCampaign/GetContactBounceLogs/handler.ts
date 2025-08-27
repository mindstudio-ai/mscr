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
  // Get environment variables
  const { accessToken, accountIdentifier } = process.env;

  // Validate environment variables
  if (!accessToken) {
    throw new Error(
      'Missing API Key. Please add your ActiveCampaign API Key in the service configuration.',
    );
  }

  if (!accountIdentifier) {
    throw new Error(
      'Missing Account URL. Please add your ActiveCampaign Account URL in the service configuration.',
    );
  }

  // Get inputs
  const { contactId, outputVariable } = inputs;

  // Validate inputs
  if (!contactId) {
    throw new Error('Contact ID is required');
  }

  // Normalize the account identifier (remove trailing slash if present)
  const baseUrl = accountIdentifier.endsWith('/')
    ? accountIdentifier.slice(0, -1)
    : accountIdentifier;

  // Construct the API URL
  const url = `${baseUrl}/api/3/contacts/${contactId}/bounceLogs`;

  log(`Retrieving bounce logs for contact ID: ${contactId}`);

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

    // Log success
    const bounceLogs = data.bounceLogs || [];
    log(`Successfully retrieved ${bounceLogs.length} bounce logs`);

    // Set the output
    setOutput(outputVariable, data.bounceLogs || []);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      log(`Error retrieving bounce logs: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred while retrieving bounce logs');
  }
};

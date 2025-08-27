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
      'Missing API Key. Please check your ActiveCampaign connection settings.',
    );
  }

  if (!accountIdentifier) {
    throw new Error(
      'Missing Account URL. Please check your ActiveCampaign connection settings.',
    );
  }

  // Extract inputs
  const { contactId, outputVariable } = inputs;

  // Validate inputs
  if (!contactId) {
    throw new Error('Contact ID is required');
  }

  // Construct the API URL
  const baseUrl = accountIdentifier.endsWith('/')
    ? accountIdentifier.slice(0, -1)
    : accountIdentifier;

  const apiUrl = `${baseUrl}/api/3/contacts/${contactId}/accountContacts`;

  log(`Retrieving account contacts for contact ID: ${contactId}`);

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
      } else {
        const errorText = await response.text();
        throw new Error(
          `API request failed with status ${response.status}: ${errorText}`,
        );
      }
    }

    // Parse the response
    const data = await response.json();

    // Set the output variable with the account contacts data
    setOutput(outputVariable, data.accountContacts || []);

    log(
      `Successfully retrieved ${data.accountContacts?.length || 0} account contacts`,
    );
  } catch (error) {
    // Handle any errors
    log(
      `Error retrieving account contacts: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};

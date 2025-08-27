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
    throw new Error('Missing Contact ID. Please provide a valid contact ID.');
  }

  // Ensure the account identifier doesn't have a trailing slash
  const baseUrl = accountIdentifier.endsWith('/')
    ? accountIdentifier.slice(0, -1)
    : accountIdentifier;

  // Construct the API URL
  const apiUrl = `${baseUrl}/api/3/contacts/${contactId}/notes`;

  log(`Retrieving notes for contact ID: ${contactId}`);

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
        throw new Error(`Contact with ID ${contactId} not found.`);
      } else if (response.status === 401 || response.status === 403) {
        throw new Error('Authentication failed. Please check your API Key.');
      } else {
        throw new Error(`API request failed with status: ${response.status}`);
      }
    }

    // Parse the response
    const data = await response.json();

    // Extract the notes array
    const notes = data.notes || [];

    log(
      `Successfully retrieved ${notes.length} notes for contact ID: ${contactId}`,
    );

    // Set the output variable with the notes data
    setOutput(outputVariable, notes);
  } catch (error) {
    // Handle any errors that occurred during the API request
    if (error instanceof Error) {
      log(`Error retrieving contact notes: ${error.message}`);
      throw error;
    } else {
      log('An unknown error occurred while retrieving contact notes');
      throw new Error(
        'An unknown error occurred while retrieving contact notes',
      );
    }
  }
};

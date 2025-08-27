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
      'Missing API Key. Please configure your ActiveCampaign API Key in the connector settings.',
    );
  }

  if (!accountIdentifier) {
    throw new Error(
      'Missing Account URL. Please configure your ActiveCampaign Account URL in the connector settings.',
    );
  }

  // Extract inputs
  const { accountId, noteId, noteContent, outputVariable } = inputs;

  // Validate required inputs
  if (!accountId) {
    throw new Error('Account ID is required');
  }

  if (!noteId) {
    throw new Error('Note ID is required');
  }

  if (!noteContent) {
    throw new Error('Note content is required');
  }

  // Construct the API URL
  // Ensure the accountIdentifier doesn't end with a slash before adding the path
  const baseUrl = accountIdentifier.endsWith('/')
    ? accountIdentifier.slice(0, -1)
    : accountIdentifier;

  const apiUrl = `${baseUrl}/api/3/accounts/${accountId}/notes/${noteId}`;

  // Prepare the request body
  const requestBody = {
    note: {
      note: noteContent,
    },
  };

  log(`Updating note ${noteId} for account ${accountId}...`);

  try {
    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Api-Token': accessToken,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to update note: ${response.status} ${response.statusText} - ${errorText}`,
      );
    }

    // Parse the response
    const data = await response.json();

    log(`Successfully updated note for account ${accountId}`);

    // Set the output variable
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error(`Unknown error occurred: ${String(error)}`);
  }
};

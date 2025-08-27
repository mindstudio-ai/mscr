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
  const { accountId, noteContent, outputVariable } = inputs;

  // Validate inputs
  if (!accountId) {
    throw new Error('Account ID is required');
  }

  if (!noteContent) {
    throw new Error('Note content is required');
  }

  // Ensure the account identifier has the correct format
  const baseUrl = accountIdentifier.endsWith('/')
    ? accountIdentifier.slice(0, -1)
    : accountIdentifier;

  // Construct the API endpoint URL
  const url = `${baseUrl}/api/3/accounts/${accountId}/notes`;

  log(`Creating note for account ID: ${accountId}`);

  try {
    // Make the API request
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Api-Token': accessToken,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        note: {
          note: noteContent,
        },
      }),
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to create note: ${response.status} ${response.statusText} - ${errorText}`,
      );
    }

    // Parse the response
    const data = await response.json();

    log(
      `Successfully created note for account "${data.accounts?.[0]?.name || accountId}"`,
    );

    // Set the output variable with the response data
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle any errors that occurred during the request
    log(`Error creating account note: ${error.message}`);
    throw error;
  }
};

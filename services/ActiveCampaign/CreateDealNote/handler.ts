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
  // Extract inputs
  const { dealId, noteContent, outputVariable } = inputs;

  // Extract environment variables
  const { accessToken, accountIdentifier } = process.env;

  // Validate required environment variables
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

  // Validate required inputs
  if (!dealId) {
    throw new Error('Deal ID is required');
  }

  if (!noteContent) {
    throw new Error('Note content is required');
  }

  // Ensure the account identifier doesn't end with a slash
  const baseUrl = accountIdentifier.endsWith('/')
    ? accountIdentifier.slice(0, -1)
    : accountIdentifier;

  // Construct the API endpoint
  const endpoint = `${baseUrl}/api/3/deals/${dealId}/notes`;

  log(`Creating note for deal ID: ${dealId}`);

  try {
    // Make the API request
    const response = await fetch(endpoint, {
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

    // Parse the response
    const responseData = await response.json();

    // Check if the request was successful
    if (!response.ok) {
      const errorMessage =
        responseData.message ||
        `Error: ${response.status} ${response.statusText}`;

      if (response.status === 404) {
        throw new Error(
          `Deal with ID ${dealId} not found. Please check the Deal ID and try again.`,
        );
      } else if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your API Key and try again.',
        );
      } else if (response.status === 403) {
        throw new Error(
          "Permission denied. You don't have permission to add notes to this deal.",
        );
      } else {
        throw new Error(`Failed to create deal note: ${errorMessage}`);
      }
    }

    log('Note created successfully');

    // Set the output variable with the response data
    setOutput(outputVariable, responseData);
  } catch (error) {
    // Handle any errors that occurred during the request
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(`An unexpected error occurred: ${String(error)}`);
    }
  }
};

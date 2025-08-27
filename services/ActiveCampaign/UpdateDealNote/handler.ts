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
  const { dealId, noteId, noteContent, outputVariable } = inputs;

  // Validate required inputs
  if (!dealId) {
    throw new Error('Deal ID is required');
  }

  if (!noteId) {
    throw new Error('Note ID is required');
  }

  if (!noteContent) {
    throw new Error('Note Content is required');
  }

  // Construct API URL
  const baseUrl = accountIdentifier.endsWith('/')
    ? accountIdentifier.slice(0, -1)
    : accountIdentifier;

  const apiUrl = `${baseUrl}/api/3/deals/${dealId}/notes/${noteId}`;

  // Prepare request body
  const requestBody = {
    note: {
      note: noteContent,
    },
  };

  log(`Updating note ${noteId} for deal ${dealId}...`);

  try {
    // Make API request
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Api-Token': accessToken,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    // Handle API response
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API request failed with status ${response.status}: ${errorText}`,
      );
    }

    const responseData = await response.json();
    log(`Note successfully updated`);

    // Set output variable
    setOutput(outputVariable, responseData);
  } catch (error) {
    // Handle errors
    const errorMessage = error instanceof Error ? error.message : String(error);
    log(`Error updating deal note: ${errorMessage}`);
    throw error;
  }
};

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
  const { contactAutomationId, outputVariable } = inputs;
  const { accessToken, accountIdentifier } = process.env;

  // Validate required inputs and environment variables
  if (!contactAutomationId) {
    throw new Error('Contact Automation ID is required');
  }

  if (!accessToken) {
    throw new Error('API Key (accessToken) is not configured');
  }

  if (!accountIdentifier) {
    throw new Error('Account URL (accountIdentifier) is not configured');
  }

  // Ensure accountIdentifier doesn't end with a slash
  const baseUrl = accountIdentifier.endsWith('/')
    ? accountIdentifier.slice(0, -1)
    : accountIdentifier;

  // Construct the API endpoint URL
  const url = `${baseUrl}/api/3/contactAutomations/${contactAutomationId}`;

  log(`Removing contact from automation (ID: ${contactAutomationId})...`);

  try {
    // Make the DELETE request to ActiveCampaign API
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Api-Token': accessToken,
      },
    });

    // Check if the request was successful
    if (response.ok) {
      log('Contact successfully removed from automation');
      setOutput(outputVariable, true);
    } else {
      // Handle API error responses
      const errorText = await response.text();
      log(
        `Failed to remove contact from automation. Status: ${response.status}`,
      );

      if (response.status === 403) {
        throw new Error('Access forbidden. Please check your API credentials.');
      } else {
        throw new Error(`API Error (${response.status}): ${errorText}`);
      }
    }
  } catch (error) {
    // Handle network or other errors
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred');
  }
};

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  // Extract environment variables
  const { accessToken, accountIdentifier } = process.env;

  // Validate environment variables
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

  // Extract inputs
  const { accountId, confirmation, outputVariable } = inputs;

  // Validate inputs
  if (!accountId) {
    throw new Error('Account ID is required.');
  }

  // Check confirmation
  if (confirmation !== 'yes') {
    throw new Error(
      "Account deletion was not confirmed. Please select 'Yes' to confirm deletion.",
    );
  }

  // Normalize base URL (remove trailing slash if present)
  const baseUrl = accountIdentifier.endsWith('/')
    ? accountIdentifier.slice(0, -1)
    : accountIdentifier;

  // Construct the API endpoint
  const url = `${baseUrl}/api/3/accounts/${accountId}`;

  log(`Preparing to delete account with ID: ${accountId}`);

  try {
    // Make the DELETE request
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Api-Token': accessToken,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    // Handle response
    if (!response.ok) {
      const errorData = await response.text();
      let errorMessage = `Failed to delete account. Status: ${response.status}`;

      try {
        // Try to parse error as JSON for more details
        const errorJson = JSON.parse(errorData);
        if (errorJson.message) {
          errorMessage += ` - ${errorJson.message}`;
        }
      } catch (e) {
        // If parsing fails, include the raw error text
        if (errorData) {
          errorMessage += ` - ${errorData}`;
        }
      }

      throw new Error(errorMessage);
    }

    log('Account deleted successfully');

    // Set output
    setOutput(outputVariable, { success: true });
  } catch (error) {
    // Handle any errors that occurred during the request
    log(`Error: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
};

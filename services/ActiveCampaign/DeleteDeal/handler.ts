export const handler = async ({
  inputs,
  setOutput,
  log,
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
  const { dealId, successMessageVar } = inputs;

  // Validate inputs
  if (!dealId) {
    throw new Error('Deal ID is required.');
  }

  // Ensure accountIdentifier doesn't end with a slash
  const baseUrl = accountIdentifier.endsWith('/')
    ? accountIdentifier.slice(0, -1)
    : accountIdentifier;

  // Construct the API URL
  const apiUrl = `${baseUrl}/api/3/deals/${dealId}`;

  log(`Deleting deal with ID: ${dealId}`);

  try {
    // Make the DELETE request to the ActiveCampaign API
    const response = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Api-Token': accessToken,
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();

      if (response.status === 404) {
        throw new Error(`Deal with ID ${dealId} not found.`);
      } else if (response.status === 403) {
        throw new Error(
          "You don't have permission to delete this deal. Please check your account permissions.",
        );
      } else {
        throw new Error(
          `Failed to delete deal: ${errorText || response.statusText}`,
        );
      }
    }

    log(`Successfully deleted deal with ID: ${dealId}`);

    // Set the output variable with a success message
    setOutput(successMessageVar, {
      success: true,
      message: `Deal with ID ${dealId} was successfully deleted.`,
    });
  } catch (error) {
    // Handle network or other errors
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred while deleting the deal.');
  }
};

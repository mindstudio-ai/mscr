export const handler = async ({
  inputs,
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
  const { associationId } = inputs;

  // Validate inputs
  if (!associationId) {
    throw new Error('Association ID is required.');
  }

  // Remove trailing slash from account identifier if present
  const baseUrl = accountIdentifier.endsWith('/')
    ? accountIdentifier.slice(0, -1)
    : accountIdentifier;

  // Construct the API URL
  const url = `${baseUrl}/api/3/accountContacts/${associationId}`;

  // Set up request options
  const options = {
    method: 'DELETE',
    headers: {
      'Api-Token': accessToken,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  log(`Deleting association with ID: ${associationId}`);

  try {
    // Make the API request
    const response = await fetch(url, options);

    // Handle the response
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Association with ID ${associationId} not found.`);
      } else {
        const errorText = await response.text();
        throw new Error(
          `Failed to delete association: ${response.status} ${response.statusText}. ${errorText}`,
        );
      }
    }

    log(`Successfully deleted association with ID: ${associationId}`);
  } catch (error) {
    // Handle any errors
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error(
      'An unknown error occurred while deleting the association.',
    );
  }
};

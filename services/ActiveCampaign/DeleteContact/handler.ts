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

  // Extract and validate inputs
  const { contactId } = inputs;

  if (!contactId) {
    throw new Error('Contact ID is required to delete a contact.');
  }

  // Construct the API URL
  const baseUrl = accountIdentifier.endsWith('/')
    ? accountIdentifier.slice(0, -1)
    : accountIdentifier;

  const url = `${baseUrl}/api/3/contacts/${contactId}`;

  log(`Deleting contact with ID: ${contactId}`);

  try {
    // Make the DELETE request
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Api-Token': accessToken,
      },
    });

    // Handle response
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(
          `Contact with ID ${contactId} not found. Please verify the contact ID and try again.`,
        );
      } else {
        const errorText = await response.text();
        throw new Error(
          `Failed to delete contact: ${response.status} ${response.statusText}. ${errorText}`,
        );
      }
    }

    log(`Successfully deleted contact with ID: ${contactId}`);
  } catch (error) {
    if (error instanceof Error) {
      // Re-throw the error we created above
      throw error;
    }
    // Handle unexpected errors
    throw new Error(`An unexpected error occurred: ${String(error)}`);
  }
};

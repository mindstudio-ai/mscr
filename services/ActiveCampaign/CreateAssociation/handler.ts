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
      'Missing API Key. Please check your ActiveCampaign API Key configuration.',
    );
  }

  if (!accountIdentifier) {
    throw new Error(
      'Missing Account URL. Please check your ActiveCampaign Account URL configuration.',
    );
  }

  // Extract inputs
  const { contactId, accountId, jobTitle, outputVariable } = inputs;

  // Validate required inputs
  if (!contactId) {
    throw new Error('Contact ID is required');
  }

  if (!accountId) {
    throw new Error('Account ID is required');
  }

  // Prepare the request URL
  // Ensure we're using the base URL without trailing slash
  const baseUrl = accountIdentifier.endsWith('/')
    ? accountIdentifier.slice(0, -1)
    : accountIdentifier;

  const url = `${baseUrl}/api/3/accountContacts`;

  // Prepare the request payload
  const payload = {
    accountContact: {
      contact: parseInt(contactId, 10),
      account: parseInt(accountId, 10),
      ...(jobTitle ? { jobTitle } : {}),
    },
  };

  log(
    `Creating association between contact ${contactId} and account ${accountId}...`,
  );

  try {
    // Make the API request
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Api-Token': accessToken,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // Parse the response
    const data = await response.json();

    // Check for errors
    if (!response.ok) {
      const errorMessage = data.message || 'Unknown error occurred';
      throw new Error(
        `ActiveCampaign API error (${response.status}): ${errorMessage}`,
      );
    }

    // Log success
    log('Association created successfully');

    // Set the output
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      // Check if this is a specific error we can provide guidance for
      if (error.message.includes('422')) {
        throw new Error(
          'Association could not be created. This may be because the contact is already associated with an account (ActiveCampaign only allows one account per contact).',
        );
      }
      throw error;
    }
    throw new Error(
      'An unexpected error occurred while creating the association',
    );
  }
};

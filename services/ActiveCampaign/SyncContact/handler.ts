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
      'Missing API Key. Please check your ActiveCampaign connection settings.',
    );
  }

  if (!accountIdentifier) {
    throw new Error(
      'Missing Account URL. Please check your ActiveCampaign connection settings.',
    );
  }

  // Extract and validate required inputs
  const { email, firstName, lastName, phone, customFields, outputVariable } =
    inputs;

  if (!email) {
    throw new Error('Email is required to sync a contact.');
  }

  // Prepare the contact data
  const contactData: Record<string, any> = {
    email,
  };

  // Add optional fields if they exist
  if (firstName) {
    contactData.firstName = firstName;
  }
  if (lastName) {
    contactData.lastName = lastName;
  }
  if (phone) {
    contactData.phone = phone;
  }

  // Process custom fields if provided
  if (customFields && Array.isArray(customFields) && customFields.length > 0) {
    contactData.fieldValues = customFields;
  }

  // Construct the request URL
  // Remove trailing slash from accountIdentifier if present
  const baseUrl = accountIdentifier.endsWith('/')
    ? accountIdentifier.slice(0, -1)
    : accountIdentifier;

  const url = `${baseUrl}/api/3/contact/sync`;

  log(`Syncing contact with email: ${email}`);

  try {
    // Make the API request
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Api-Token': accessToken,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ contact: contactData }),
    });

    // Parse the response
    const responseData = await response.json();

    // Check for errors
    if (!response.ok) {
      const errorMessage = responseData.message || 'Unknown error occurred';
      throw new Error(
        `ActiveCampaign API error (${response.status}): ${errorMessage}`,
      );
    }

    // Determine if this was a create or update operation
    const isNewContact = response.status === 201;
    log(
      `Successfully ${isNewContact ? 'created' : 'updated'} contact: ${email}`,
    );

    // Set the output variable with the response data
    setOutput(outputVariable, responseData);
  } catch (error) {
    // Handle any errors that occurred during the request
    if (error instanceof Error) {
      log(`Error syncing contact: ${error.message}`);
      throw error;
    }
    throw new Error('Unknown error occurred while syncing contact');
  }
};

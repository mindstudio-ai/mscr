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
      'Missing API Key. Please configure your ActiveCampaign API Key in the connector settings.',
    );
  }

  if (!accountIdentifier) {
    throw new Error(
      'Missing Account URL. Please configure your ActiveCampaign Account URL in the connector settings.',
    );
  }

  // Extract inputs
  const {
    email,
    firstName,
    lastName,
    phone,
    allowNullEmail,
    customFields,
    outputVariable,
  } = inputs;

  // Validate that either email or phone is provided
  if (!email && !phone) {
    throw new Error(
      'Either an email address or phone number is required to create a contact.',
    );
  }

  // Prepare the request body
  const contactData: Record<string, any> = {
    contact: {
      ...(email && { email }),
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(phone && { phone }),
      allowNullEmail: allowNullEmail === 'true',
    },
  };

  // Add custom fields if provided
  if (customFields && Array.isArray(customFields) && customFields.length > 0) {
    contactData.contact.fieldValues = customFields;
  }

  log(
    `Creating contact ${email ? `with email ${email}` : `with phone ${phone}`}...`,
  );

  try {
    // Make the API request
    const response = await fetch(`${accountIdentifier}/api/3/contacts`, {
      method: 'POST',
      headers: {
        'Api-Token': accessToken,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(contactData),
    });

    // Parse the response
    const responseData = await response.json();

    // Check for errors
    if (!response.ok) {
      const errorMessage = responseData.message || 'Unknown error occurred';
      throw new Error(
        `Failed to create contact: ${errorMessage} (Status code: ${response.status})`,
      );
    }

    log(`Contact successfully created in ActiveCampaign.`);

    // Set the output
    setOutput(outputVariable, responseData);
  } catch (error) {
    // Handle any errors
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred while creating the contact');
  }
};

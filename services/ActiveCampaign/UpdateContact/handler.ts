export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  const { accessToken, accountIdentifier } = process.env;

  if (!accessToken) {
    throw new Error('Missing API Key in environment variables');
  }

  if (!accountIdentifier) {
    throw new Error('Missing Account URL in environment variables');
  }

  const {
    contactId,
    email,
    firstName,
    lastName,
    phone,
    customFields,
    outputVariable,
  } = inputs;

  if (!contactId) {
    throw new Error('Contact ID is required');
  }

  // Build the base URL
  const baseUrl = accountIdentifier.endsWith('/')
    ? accountIdentifier.slice(0, -1)
    : accountIdentifier;

  const url = `${baseUrl}/api/3/contacts/${contactId}`;

  log(`Updating contact with ID: ${contactId}`);

  // Prepare contact data
  const contactData: Record<string, any> = {};

  // Only add fields that are provided
  if (email !== undefined) {
    contactData.email = email;
  }
  if (firstName !== undefined) {
    contactData.firstName = firstName;
  }
  if (lastName !== undefined) {
    contactData.lastName = lastName;
  }
  if (phone !== undefined) {
    contactData.phone = phone;
  }

  // Process custom fields if provided
  if (customFields && Array.isArray(customFields) && customFields.length > 0) {
    contactData.fieldValues = customFields;
  }

  // Prepare request body
  const requestBody = {
    contact: contactData,
  };

  try {
    // Make the API request
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Api-Token': accessToken,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `ActiveCampaign API error (${response.status}): ${errorText}`,
      );
    }

    const responseData = await response.json();
    log('Contact updated successfully');

    // Set the output variable with the response data
    setOutput(outputVariable, responseData);
  } catch (error) {
    log(
      `Error updating contact: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};

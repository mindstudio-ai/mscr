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
      'Missing API Key. Please add your ActiveCampaign API Key in the connector settings.',
    );
  }

  if (!accountIdentifier) {
    throw new Error(
      'Missing Account URL. Please add your ActiveCampaign Account URL in the connector settings.',
    );
  }

  // Extract inputs
  const {
    accountName,
    accountUrl,
    ownerId,
    customFields = '[]',
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!accountName) {
    throw new Error('Account Name is required');
  }

  // Prepare the API URL
  // Remove trailing slash if present in the accountIdentifier
  const baseUrl = accountIdentifier.endsWith('/')
    ? accountIdentifier.slice(0, -1)
    : accountIdentifier;

  const apiUrl = `${baseUrl}/api/3/accounts`;

  // Parse custom fields if provided
  let parsedFields = [];
  try {
    // Note: If customFields is already an array (auto-parsed), this will still work
    parsedFields =
      typeof customFields === 'string'
        ? JSON.parse(customFields)
        : customFields;

    if (!Array.isArray(parsedFields)) {
      throw new Error('Custom fields must be a valid JSON array');
    }
  } catch (error) {
    throw new Error(`Invalid custom fields format: ${error.message}`);
  }

  // Prepare request body
  const requestBody = {
    account: {
      name: accountName,
      ...(accountUrl && { accountUrl }),
      ...(ownerId && { owner: parseInt(ownerId, 10) }),
      ...(parsedFields.length > 0 && { fields: parsedFields }),
    },
  };

  log(`Creating account "${accountName}" in ActiveCampaign...`);

  try {
    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Api-Token': accessToken,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    // Parse the response
    const responseData = await response.json();

    // Handle error responses
    if (!response.ok) {
      const errorMessage = responseData.message || 'Unknown error occurred';
      if (response.status === 422) {
        throw new Error(`Validation error: ${errorMessage}`);
      } else if (response.status === 401 || response.status === 403) {
        throw new Error(`Authentication error: Please check your API key`);
      } else {
        throw new Error(`API error (${response.status}): ${errorMessage}`);
      }
    }

    // Success
    log(
      `Account "${accountName}" created successfully with ID: ${responseData.account?.id}`,
    );

    // Set the output
    setOutput(outputVariable, responseData);
  } catch (error) {
    // Handle network errors or JSON parsing errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error(
        `Network error: Unable to connect to ActiveCampaign. Please check your account URL.`,
      );
    }

    // Re-throw other errors
    throw error;
  }
};

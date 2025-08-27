export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  // Extract the bearer token from environment variables
  const { token } = process.env;
  if (!token) {
    throw new Error('Missing Airtable authentication token');
  }

  // Extract inputs from the configuration
  const { baseId, notificationUrl, dataTypes, tableId, outputVariable } =
    inputs;

  // Validate required inputs
  if (!baseId) {
    throw new Error('Base ID is required');
  }

  if (!dataTypes) {
    throw new Error('Data Types is required');
  }

  // Prepare the webhook specification
  const specification: any = {
    options: {
      filters: {
        dataTypes: [dataTypes],
      },
    },
  };

  // Add table ID to the specification if provided
  if (tableId && dataTypes === 'tableData') {
    specification.options.filters.recordChangeScope = tableId;
  }

  // Prepare the request body
  const requestBody: any = {
    specification,
  };

  // Add notification URL if provided
  if (notificationUrl) {
    requestBody.notificationUrl = notificationUrl;
  }

  log(`Creating webhook for base ${baseId}...`);

  try {
    // Make the API request to create the webhook
    const response = await fetch(
      `https://api.airtable.com/v0/bases/${baseId}/webhooks`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      },
    );

    // Parse the response
    const responseData = await response.json();

    // Check for errors
    if (!response.ok) {
      const errorMessage =
        responseData.error?.message || 'Unknown error occurred';
      throw new Error(`Airtable API error: ${errorMessage}`);
    }

    log('Webhook created successfully!');

    // Set the output variable with the webhook information
    setOutput(outputVariable, {
      id: responseData.id,
      macSecretBase64: responseData.macSecretBase64,
      expirationTime: responseData.expirationTime,
    });

    // Provide helpful information about the webhook
    log(`Webhook ID: ${responseData.id}`);
    log(`This webhook will expire on: ${responseData.expirationTime || 'N/A'}`);
    log(
      'Important: Store the MAC secret securely. It cannot be retrieved later.',
    );
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      log(`Error creating webhook: ${error.message}`);
      throw error;
    }
    throw new Error('Unknown error occurred while creating webhook');
  }
};

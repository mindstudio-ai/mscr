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
  // Extract API key from environment variables
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your HeyReach API key in the service settings.',
    );
  }

  // Extract inputs
  const {
    webhookId,
    webhookName,
    webhookUrl,
    eventType,
    campaignIds,
    isActive,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!webhookId) {
    throw new Error('Webhook ID is required');
  }

  if (!outputVariable) {
    throw new Error('Output variable name is required');
  }

  // Prepare request body
  // Only include properties that are provided (not undefined or empty string)
  const requestBody: Record<string, any> = {};

  if (webhookName) {
    requestBody.webhookName = webhookName;
  }

  if (webhookUrl) {
    requestBody.webhookUrl = webhookUrl;
  }

  if (eventType) {
    requestBody.eventType = eventType;
  }

  // Handle campaign IDs - convert from comma-separated string to array if provided
  if (campaignIds !== undefined) {
    if (campaignIds === '[]') {
      // Empty array to listen to all campaigns
      requestBody.campaignIds = [];
    } else if (campaignIds) {
      // Parse comma-separated IDs into an array
      requestBody.campaignIds = campaignIds.split(',').map((id) => id.trim());
    }
  }

  // Handle isActive - convert string to boolean or null
  if (isActive === 'true') {
    requestBody.isActive = true;
  } else if (isActive === 'false') {
    requestBody.isActive = false;
  }

  // Log the action
  log(`Updating webhook with ID: ${webhookId}`);

  try {
    // Make the API request
    const response = await fetch(
      `https://api.heyreach.io/api/public/webhooks/UpdateWebhook?webhookId=${encodeURIComponent(webhookId)}`,
      {
        method: 'PATCH',
        headers: {
          'X-API-KEY': apiKey,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(requestBody),
      },
    );

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to update webhook: ${response.status} ${response.statusText} - ${errorText}`,
      );
    }

    // Parse and handle the response
    let responseData;
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    log('Webhook updated successfully');

    // Set the output variable
    setOutput(outputVariable, responseData);
  } catch (error) {
    // Handle errors
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    log(`Error: ${errorMessage}`);
    throw error;
  }
};

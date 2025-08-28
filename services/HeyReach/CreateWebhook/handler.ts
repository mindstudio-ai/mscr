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
      'Missing API Key. Please configure your HeyReach API Key in the service settings.',
    );
  }

  // Extract inputs
  const { webhookName, webhookUrl, eventType, campaignIds, outputVariable } =
    inputs;

  // Validate required inputs
  if (!webhookName) {
    throw new Error('Webhook Name is required');
  }
  if (!webhookUrl) {
    throw new Error('Webhook URL is required');
  }
  if (!eventType) {
    throw new Error('Event Type is required');
  }

  // Process campaign IDs
  let campaignIdsArray: string[] = [];
  if (
    campaignIds &&
    typeof campaignIds === 'string' &&
    campaignIds.trim() !== ''
  ) {
    campaignIdsArray = campaignIds.split(',').map((id) => id.trim());
    log(`Filtering webhook to ${campaignIdsArray.length} campaigns`);
  } else {
    log('Webhook will listen to events from all campaigns');
  }

  // Prepare request body
  const requestBody = {
    webhookName,
    webhookUrl,
    eventType,
    campaignIds: campaignIdsArray,
  };

  log(`Creating webhook "${webhookName}" for event type: ${eventType}`);

  try {
    // Make API request
    const response = await fetch(
      'https://api.heyreach.io/api/public/webhooks/CreateWebhook',
      {
        method: 'POST',
        headers: {
          'X-API-KEY': apiKey,
          'Content-Type': 'application/json',
          Accept: 'text/plain',
        },
        body: JSON.stringify(requestBody),
      },
    );

    // Handle API response
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HeyReach API error (${response.status}): ${errorText}`);
    }

    // Parse response
    const result = await response.json();
    log('Webhook created successfully');

    // Set output
    setOutput(outputVariable, result);
  } catch (error) {
    log(
      `Error creating webhook: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};

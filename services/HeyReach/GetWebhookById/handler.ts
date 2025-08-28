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
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please check your HeyReach API Key configuration.',
    );
  }

  const { webhookId, outputVariable } = inputs;

  if (!webhookId) {
    throw new Error('Webhook ID is required');
  }

  log(`Retrieving webhook with ID: ${webhookId}`);

  try {
    const response = await fetch(
      `https://api.heyreach.io/api/public/webhooks/GetWebhookById?webhookId=${encodeURIComponent(webhookId)}`,
      {
        method: 'GET',
        headers: {
          'X-API-KEY': apiKey,
          'Content-Type': 'application/json',
          Accept: 'text/plain',
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to retrieve webhook: ${response.status} ${response.statusText}. ${errorText}`,
      );
    }

    const webhookData = await response.json();
    log('Successfully retrieved webhook details');

    // Set the output variable with the webhook data
    setOutput(outputVariable, webhookData);
  } catch (error) {
    // Handle any errors that occurred during the request
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred while retrieving the webhook');
  }
};

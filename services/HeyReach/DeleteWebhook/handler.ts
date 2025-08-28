export const handler = async ({
  inputs,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  // Get API key from environment variables
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your HeyReach API Key in the connector settings.',
    );
  }

  // Get webhook ID from inputs
  const { webhookId } = inputs;
  if (!webhookId) {
    throw new Error(
      'Missing Webhook ID. Please provide a webhook ID to delete.',
    );
  }

  // Construct the URL with query parameter
  const url = `https://api.heyreach.io/api/public/webhooks/DeleteWebhook?webhookId=${encodeURIComponent(webhookId)}`;

  log(`Deleting webhook with ID: ${webhookId}`);

  try {
    // Make the DELETE request to the HeyReach API
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
        Accept: 'text/plain',
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to delete webhook: ${response.status} ${response.statusText}. ${errorText}`,
      );
    }

    log(`Successfully deleted webhook with ID: ${webhookId}`);
  } catch (error) {
    // Handle any errors that occurred during the request
    if (error instanceof Error) {
      log(`Error deleting webhook: ${error.message}`);
      throw error;
    }
    throw new Error(
      `Unknown error occurred while deleting webhook: ${String(error)}`,
    );
  }
};

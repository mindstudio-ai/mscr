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
  const { url, consumerKey, consumerSecret } = process.env;

  // Validate environment variables
  if (!url) {
    throw new Error(
      'Missing Store URL. Please configure your WooCommerce store URL in the service settings.',
    );
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing API credentials. Please configure your WooCommerce Consumer Key and Consumer Secret in the service settings.',
    );
  }

  // Extract inputs
  const { webhookId, forceDelete, outputVariable } = inputs;

  // Validate inputs
  if (!webhookId) {
    throw new Error('Webhook ID is required');
  }

  // Format the base URL (remove trailing slash if present)
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;

  // Construct the API URL with force parameter if needed
  const apiUrl = `${baseUrl}/wp-json/wc/v3/webhooks/${webhookId}${forceDelete === 'true' ? '?force=true' : ''}`;

  // Create Basic Auth credentials
  const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  log(
    `Deleting webhook with ID: ${webhookId}${forceDelete === 'true' ? ' (force delete)' : ''}`,
  );

  try {
    // Make the DELETE request to the WooCommerce API
    const response = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // Handle non-successful responses
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to delete webhook: ${response.status} ${response.statusText}. ${errorText}`,
      );
    }

    // Parse the response
    const data = await response.json();

    log(`Successfully deleted webhook: ${data.name || webhookId}`);

    // Set the output variable with the deleted webhook data
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle any errors that occurred during the request
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    log(`Error: ${errorMessage}`);
    throw error;
  }
};

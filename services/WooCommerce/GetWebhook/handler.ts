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
  const { url, consumerKey, consumerSecret } = process.env;

  // Validate environment variables
  if (!url) {
    throw new Error(
      'Missing WooCommerce Store URL. Please configure the URL in the connector settings.',
    );
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing WooCommerce API credentials. Please configure your Consumer Key and Consumer Secret.',
    );
  }

  // Extract inputs
  const { webhookId, outputVariable } = inputs;

  if (!webhookId) {
    throw new Error('Webhook ID is required');
  }

  // Create the authorization header for Basic Auth
  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  // Construct the API endpoint
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const endpoint = `${baseUrl}/wp-json/wc/v3/webhooks/${webhookId}`;

  log(`Retrieving webhook with ID: ${webhookId}`);

  try {
    // Make the API request
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // Handle API response
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Webhook with ID ${webhookId} not found`);
      } else {
        const errorText = await response.text();
        throw new Error(
          `WooCommerce API error (${response.status}): ${errorText}`,
        );
      }
    }

    // Parse the response
    const webhookData = await response.json();

    log(`Successfully retrieved webhook: ${webhookData.name}`);

    // Set the output variable
    setOutput(outputVariable, webhookData);
  } catch (error) {
    // Handle any errors that occurred during the request
    if (error instanceof Error) {
      throw new Error(`Failed to retrieve webhook: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while retrieving the webhook');
    }
  }
};

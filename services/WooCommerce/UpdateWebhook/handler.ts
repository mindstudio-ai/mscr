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
  if (!url || !consumerKey || !consumerSecret) {
    throw new Error(
      'Missing required environment variables: url, consumerKey, or consumerSecret',
    );
  }

  // Extract input variables
  const {
    webhookId,
    name,
    status,
    topic,
    deliveryUrl,
    secret,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!webhookId) {
    throw new Error('Webhook ID is required');
  }

  // Build the request URL
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const requestUrl = `${baseUrl}/wp-json/wc/v3/webhooks/${webhookId}`;

  // Create auth credentials for Basic Auth
  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  // Build request body with only the fields that were provided
  const requestBody: Record<string, string> = {};
  if (name !== undefined) {
    requestBody.name = name;
  }
  if (status !== undefined) {
    requestBody.status = status;
  }
  if (topic !== undefined) {
    requestBody.topic = topic;
  }
  if (deliveryUrl !== undefined) {
    requestBody.delivery_url = deliveryUrl;
  }
  if (secret !== undefined) {
    requestBody.secret = secret;
  }

  // Log what we're about to do
  log(`Updating webhook ${webhookId} in WooCommerce...`);

  try {
    // Make the PUT request to update the webhook
    const response = await fetch(requestUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to update webhook: ${response.status} ${response.statusText} - ${errorText}`,
      );
    }

    // Parse the response
    const webhookData = await response.json();

    // Log success message
    log(
      `Successfully updated webhook "${webhookData.name}" (ID: ${webhookData.id})`,
    );

    // Set the output variable with the updated webhook data
    setOutput(outputVariable, webhookData);
  } catch (error) {
    // Handle errors
    const errorMessage = error instanceof Error ? error.message : String(error);
    log(`Error: ${errorMessage}`);
    throw error;
  }
};

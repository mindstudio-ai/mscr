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
      'Missing WooCommerce store URL. Please check your connection settings.',
    );
  }
  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing WooCommerce API credentials. Please check your connection settings.',
    );
  }

  // Extract inputs
  const { name, topic, deliveryUrl, secret, outputVariable } = inputs;

  // Validate required inputs
  if (!deliveryUrl) {
    throw new Error('Delivery URL is required');
  }
  if (!topic) {
    throw new Error('Event Topic is required');
  }

  // Construct the API endpoint
  const endpoint = `${url.replace(/\/$/, '')}/wp-json/wc/v3/webhooks`;

  // Prepare request body
  const requestBody: Record<string, string> = {
    name: name,
    topic: topic,
    delivery_url: deliveryUrl,
  };

  // Add optional secret if provided
  if (secret) {
    requestBody.secret = secret;
  }

  log(`Creating WooCommerce webhook for topic: ${topic}`);

  try {
    // Create Basic Auth credentials
    const credentials = Buffer.from(
      `${consumerKey}:${consumerSecret}`,
    ).toString('base64');

    // Make the API request
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
      body: JSON.stringify(requestBody),
    });

    // Handle response
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `WooCommerce API error (${response.status}): ${errorText}`,
      );
    }

    const webhookData = await response.json();

    log(
      `Successfully created webhook: ${webhookData.name} (ID: ${webhookData.id})`,
    );

    // Set the output variable
    setOutput(outputVariable, webhookData);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      log(`Error creating webhook: ${error.message}`);
      throw error;
    }
    throw new Error('Unknown error occurred while creating webhook');
  }
};

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
      "Missing WooCommerce store URL. Please configure the 'url' environment variable.",
    );
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      "Missing WooCommerce API credentials. Please configure the 'consumerKey' and 'consumerSecret' environment variables.",
    );
  }

  // Extract inputs
  const { orderId, noteContent, customerNote, outputVariable } = inputs;

  // Validate required inputs
  if (!orderId) {
    throw new Error('Order ID is required');
  }

  if (!noteContent) {
    throw new Error('Note content is required');
  }

  // Construct the API endpoint URL
  // Remove trailing slash from base URL if present
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const endpoint = `${baseUrl}/wp-json/wc/v3/orders/${orderId}/notes`;

  // Prepare request body
  const requestBody = {
    note: noteContent,
    customer_note: customerNote === 'true',
  };

  log(`Creating note for order #${orderId}...`);

  try {
    // Create Basic Auth credentials
    const credentials = Buffer.from(
      `${consumerKey}:${consumerSecret}`,
    ).toString('base64');

    // Make the API request
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
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

    const data = await response.json();

    log(`Successfully created note #${data.id} for order #${orderId}`);

    // Set output variable with the created note data
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      log(`Error creating order note: ${error.message}`);
      throw error;
    }
    throw new Error(`Unknown error occurred: ${String(error)}`);
  }
};

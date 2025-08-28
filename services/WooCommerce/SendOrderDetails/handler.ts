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
  // Get environment variables
  const { url, consumerKey, consumerSecret } = process.env;

  // Validate environment variables
  if (!url) {
    throw new Error('Missing WooCommerce Store URL in environment variables');
  }
  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing WooCommerce API credentials in environment variables',
    );
  }

  // Get inputs
  const { orderId, email, forceEmailUpdate, outputVariable } = inputs;

  // Validate required inputs
  if (!orderId) {
    throw new Error('Order ID is required');
  }

  // Prepare the API endpoint
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const endpoint = `${baseUrl}/wp-json/wc/v3/orders/${orderId}/actions/send_order_details`;

  log(`Preparing to send order details for order #${orderId}`);

  // Prepare request body
  const requestBody: Record<string, any> = {};

  if (email) {
    requestBody.email = email;
    log(`Will send order details to: ${email}`);
  }

  if (forceEmailUpdate === 'true') {
    requestBody.force_email_update = true;
    log('Will update the billing email if it already exists');
  }

  try {
    // Create authorization header using Basic Auth
    const credentials = Buffer.from(
      `${consumerKey}:${consumerSecret}`,
    ).toString('base64');

    // Make the API request
    log('Sending request to WooCommerce API...');
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    // Parse the response
    const data = await response.json();

    if (!response.ok) {
      // Handle API error
      const errorMessage = data.message || 'Unknown error occurred';
      log(`Error: ${errorMessage}`);
      throw new Error(`WooCommerce API error: ${errorMessage}`);
    }

    // Success case
    log('Order details sent successfully');
    setOutput(
      outputVariable,
      data.message || 'Order details sent successfully',
    );
  } catch (error) {
    // Handle any other errors
    const errorMessage = error instanceof Error ? error.message : String(error);
    log(`Failed to send order details: ${errorMessage}`);
    throw error;
  }
};

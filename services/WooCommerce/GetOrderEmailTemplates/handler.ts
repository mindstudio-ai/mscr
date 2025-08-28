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
      'Missing Store URL. Please configure your WooCommerce store URL in the connector settings.',
    );
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing API credentials. Please configure your WooCommerce API Consumer Key and Secret in the connector settings.',
    );
  }

  // Extract input variables
  const { orderId, outputVariable } = inputs;

  if (!orderId) {
    throw new Error('Order ID is required');
  }

  // Construct the API endpoint URL
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const endpoint = `${baseUrl}/wp-json/wc/v3/orders/${orderId}/actions/email_templates`;

  // Create authorization header using Basic Auth
  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  log(`Retrieving email templates for order #${orderId}...`);

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
      const errorText = await response.text();
      throw new Error(
        `WooCommerce API error (${response.status}): ${errorText}`,
      );
    }

    const templates = await response.json();

    if (!Array.isArray(templates)) {
      throw new Error(
        'Unexpected response format. Expected an array of templates.',
      );
    }

    log(
      `Successfully retrieved ${templates.length} email template(s) for order #${orderId}`,
    );

    // Set the output variable with the array of email templates
    setOutput(outputVariable, templates);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      if (error.message.includes('404')) {
        throw new Error(
          `Order #${orderId} not found. Please verify the order ID and try again.`,
        );
      }
      throw error;
    }
    throw new Error(
      'An unexpected error occurred while retrieving email templates',
    );
  }
};

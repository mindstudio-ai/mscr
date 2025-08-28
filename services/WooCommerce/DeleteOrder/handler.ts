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
      "Missing WooCommerce Store URL. Please configure the 'url' environment variable.",
    );
  }
  if (!consumerKey || !consumerSecret) {
    throw new Error(
      "Missing WooCommerce API credentials. Please configure the 'consumerKey' and 'consumerSecret' environment variables.",
    );
  }

  // Extract inputs
  const { orderId, force, outputVariable } = inputs;

  // Validate inputs
  if (!orderId) {
    throw new Error('Order ID is required');
  }

  // Construct the API URL
  const apiUrl = `${url.replace(/\/$/, '')}/wp-json/wc/v3/orders/${orderId}?force=${force}`;

  // Create Basic Auth credentials
  const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  log(
    `Deleting order #${orderId}${force === 'true' ? ' permanently' : ' (moving to trash)'}`,
  );

  try {
    // Make the DELETE request
    const response = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
    });

    // Handle API response
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to delete order: ${response.status} ${response.statusText} - ${errorText}`,
      );
    }

    // Parse the response
    const deletedOrder = await response.json();

    // Log success message
    if (force === 'true') {
      log(`Order #${orderId} has been permanently deleted`);
    } else {
      log(`Order #${orderId} has been moved to trash`);
    }

    // Set the output variable
    setOutput(outputVariable, deletedOrder);
  } catch (error) {
    // Handle errors
    const errorMessage = error instanceof Error ? error.message : String(error);
    log(`Error: ${errorMessage}`);
    throw error;
  }
};

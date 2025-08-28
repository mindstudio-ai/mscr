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
    throw new Error('Missing store URL in environment variables');
  }
  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing WooCommerce API credentials in environment variables',
    );
  }

  // Extract inputs
  const { shippingClassId, outputVariable } = inputs;

  // Validate inputs
  if (!shippingClassId) {
    throw new Error('Shipping Class ID is required');
  }

  // Remove trailing slash from URL if present
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;

  // Construct the API endpoint URL
  const apiUrl = `${baseUrl}/wp-json/wc/v3/products/shipping_classes/${shippingClassId}?force=true`;

  log(`Deleting shipping class with ID: ${shippingClassId}`);

  try {
    // Create Basic Auth credentials
    const credentials = Buffer.from(
      `${consumerKey}:${consumerSecret}`,
    ).toString('base64');

    // Make the DELETE request
    const response = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(
        `Failed to delete shipping class: ${response.status} ${response.statusText} - ${errorData}`,
      );
    }

    // Parse the response
    const data = await response.json();

    log(`Successfully deleted shipping class: ${data.name || shippingClassId}`);

    // Set the output variable with the deleted shipping class data
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error(`Unknown error occurred: ${String(error)}`);
  }
};

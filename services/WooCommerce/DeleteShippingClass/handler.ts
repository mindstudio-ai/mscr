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
      'Missing store URL. Please configure your WooCommerce store URL in the connector settings.',
    );
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing API credentials. Please configure your WooCommerce Consumer Key and Consumer Secret in the connector settings.',
    );
  }

  // Extract inputs
  const { shippingClassId, force, outputVariable } = inputs;

  if (!shippingClassId) {
    throw new Error(
      'Missing shipping class ID. Please provide a valid shipping class ID.',
    );
  }

  // Normalize the base URL (remove trailing slash if present)
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;

  // Construct the API URL
  const apiUrl = `${baseUrl}/wp-json/wc/v3/products/shipping_classes/${shippingClassId}?force=${force}`;

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

    // Parse the response
    const data = await response.json();

    // Check if the request was successful
    if (!response.ok) {
      if (data.message) {
        throw new Error(`WooCommerce API Error: ${data.message}`);
      } else {
        throw new Error(`WooCommerce API Error: ${response.statusText}`);
      }
    }

    log(`Successfully deleted shipping class: ${data.name} (ID: ${data.id})`);

    // Set the output variable with the deleted shipping class data
    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error deleting shipping class: ${error.message}`);
      throw error;
    }
    throw new Error(
      'An unknown error occurred while deleting the shipping class',
    );
  }
};

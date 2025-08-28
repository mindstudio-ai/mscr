import fetch from 'node-fetch';

export const handler = async ({
  inputs,
  setOutput,
  log,
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
    throw new Error(
      'Missing Store URL. Please configure your WooCommerce store URL in the connector settings.',
    );
  }
  if (!consumerKey) {
    throw new Error(
      'Missing Consumer Key. Please configure your WooCommerce API Consumer Key in the connector settings.',
    );
  }
  if (!consumerSecret) {
    throw new Error(
      'Missing Consumer Secret. Please configure your WooCommerce API Consumer Secret in the connector settings.',
    );
  }

  // Get inputs
  const { productId, force, outputVariable } = inputs;

  // Validate inputs
  if (!productId) {
    throw new Error('Missing Product ID. Please provide a valid product ID.');
  }

  // Prepare the API endpoint
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const endpoint = `${baseUrl}/wp-json/wc/v3/products/${productId}?force=${force}`;

  // Create authorization header (Basic Auth)
  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  log(`Deleting product with ID: ${productId}`);
  if (force === 'true') {
    log('Product will be permanently deleted');
  } else {
    log('Product will be moved to trash');
  }

  try {
    // Make the DELETE request to WooCommerce API
    const response = await fetch(endpoint, {
      method: 'DELETE',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/json',
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to delete product: ${response.status} ${response.statusText} - ${errorText}`,
      );
    }

    // Parse the response
    const data = await response.json();

    // Set the output variable with the deleted product information
    setOutput(outputVariable, data);

    log(
      `Product "${data.name}" (ID: ${data.id}) was successfully ${force === 'true' ? 'permanently deleted' : 'moved to trash'}`,
    );
  } catch (error) {
    // Handle errors
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    log(`Error: ${errorMessage}`);
    throw error;
  }
};

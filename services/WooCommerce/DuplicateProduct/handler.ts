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

  // Extract inputs
  const { productId, outputVariable } = inputs;

  if (!productId) {
    throw new Error('Product ID is required');
  }

  // Normalize the base URL (remove trailing slash if present)
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;

  // Construct the API endpoint
  const endpoint = `${baseUrl}/wp-json/wc/v3/products/${productId}/duplicate`;

  log(`Duplicating product with ID: ${productId}`);

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
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `WooCommerce API error (${response.status}): ${errorText}`,
      );
    }

    // Parse the response
    const duplicatedProduct = await response.json();

    log(
      `Product successfully duplicated! New product ID: ${duplicatedProduct.id}, Name: "${duplicatedProduct.name}"`,
    );
    log(`The duplicated product has been created in "draft" status`);

    // Set the output variable with the duplicated product data
    setOutput(outputVariable, duplicatedProduct);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      log(`Error duplicating product: ${error.message}`);
      throw error;
    }
    throw new Error('Unknown error occurred while duplicating product');
  }
};

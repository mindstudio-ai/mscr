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
      'Missing WooCommerce store URL. Please check your connector configuration.',
    );
  }
  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing WooCommerce API credentials. Please check your connector configuration.',
    );
  }

  // Extract inputs
  const { productId, variationId, outputVariable } = inputs;

  // Validate required inputs
  if (!productId) {
    throw new Error('Product ID is required');
  }
  if (!variationId) {
    throw new Error('Variation ID is required');
  }

  // Normalize the base URL by removing trailing slashes
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;

  // Construct the API endpoint
  const endpoint = `${baseUrl}/wp-json/wc/v3/products/${productId}/variations/${variationId}`;

  log(
    `Retrieving product variation ${variationId} for product ${productId}...`,
  );

  try {
    // Create authorization header using Basic Auth
    const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      'base64',
    );

    // Make the API request
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
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
    const variationData = await response.json();

    log(
      `Successfully retrieved variation "${variationData.id}" - ${variationData.description || 'No description'}`,
    );

    // Set the output variable with the variation data
    setOutput(outputVariable, variationData);
  } catch (error) {
    // Handle any errors that occurred during the request
    if (error instanceof Error) {
      log(`Error retrieving product variation: ${error.message}`);
      throw error;
    }
    throw new Error(
      'An unknown error occurred while retrieving the product variation',
    );
  }
};

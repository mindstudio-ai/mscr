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
    throw new Error('Missing Store URL in environment variables');
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing WooCommerce API credentials in environment variables',
    );
  }

  // Extract inputs
  const { productId, variationId, forceDelete, outputVariable } = inputs;

  // Validate required inputs
  if (!productId) {
    throw new Error('Product ID is required');
  }

  if (!variationId) {
    throw new Error('Variation ID is required');
  }

  // Normalize the store URL (remove trailing slash if present)
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;

  // Construct the API endpoint URL
  const apiUrl = `${baseUrl}/wp-json/wc/v3/products/${productId}/variations/${variationId}?force=${forceDelete}`;

  // Create Basic Auth credentials
  const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  try {
    log(`Deleting variation ${variationId} from product ${productId}...`);

    // Make the DELETE request to the WooCommerce API
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
      const errorText = await response.text();
      throw new Error(
        `Failed to delete variation: ${response.status} ${response.statusText} - ${errorText}`,
      );
    }

    // Parse the response
    const deletedVariation = await response.json();

    log(
      `Successfully deleted variation ${variationId} from product ${productId}`,
    );

    // Set the output variable with the deleted variation data
    setOutput(outputVariable, deletedVariation);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error(
      'An unknown error occurred while deleting the product variation',
    );
  }
};

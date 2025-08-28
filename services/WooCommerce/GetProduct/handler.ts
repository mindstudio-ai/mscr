import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

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
      'Missing WooCommerce store URL. Please check your connection settings.',
    );
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing WooCommerce API credentials. Please check your connection settings.',
    );
  }

  // Extract inputs
  const { productId, outputVariable } = inputs;

  if (!productId) {
    throw new Error('Product ID is required');
  }

  // Initialize WooCommerce API client
  const api = new WooCommerceRestApi({
    url: url,
    consumerKey: consumerKey,
    consumerSecret: consumerSecret,
    version: 'wc/v3',
  });

  try {
    log(`Retrieving product with ID: ${productId}`);

    // Make the API request to get the product
    const response = await api.get(`products/${productId}`);

    log(`Successfully retrieved product: ${response.data.name}`);

    // Set the output variable with the product data
    setOutput(outputVariable, response.data);
  } catch (error: any) {
    // Handle common errors
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error(`Product with ID ${productId} not found`);
      } else if (error.response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your WooCommerce API credentials.',
        );
      } else {
        throw new Error(
          `WooCommerce API error: ${error.response.data?.message || error.message}`,
        );
      }
    } else {
      throw new Error(`Error connecting to WooCommerce: ${error.message}`);
    }
  }
};

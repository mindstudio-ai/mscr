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
  // Extract inputs
  const { categoryId, outputVariable } = inputs;

  // Extract environment variables
  const { url, consumerKey, consumerSecret } = process.env;

  // Validate required environment variables
  if (!url) {
    throw new Error(
      'Store URL is required. Please check your WooCommerce connection settings.',
    );
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'API Consumer Key and Consumer Secret are required. Please check your WooCommerce connection settings.',
    );
  }

  // Validate required inputs
  if (!categoryId) {
    throw new Error('Category ID is required.');
  }

  // Initialize WooCommerce API client
  const api = new WooCommerceRestApi({
    url: url,
    consumerKey: consumerKey,
    consumerSecret: consumerSecret,
    version: 'wc/v3',
  });

  try {
    log(`Retrieving product category with ID: ${categoryId}`);

    // Make API request to get the product category
    const response = await api.get(`products/categories/${categoryId}`);

    // Check if the response is successful
    if (response.status !== 200) {
      throw new Error(
        `Failed to retrieve product category. Status: ${response.status}`,
      );
    }

    log(`Successfully retrieved product category: ${response.data.name}`);

    // Set the output variable with the category data
    setOutput(outputVariable, response.data);
  } catch (error: any) {
    // Handle specific error cases
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error(`Product category with ID ${categoryId} not found.`);
      } else if (error.response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your WooCommerce API credentials.',
        );
      } else {
        throw new Error(
          `WooCommerce API error: ${error.response.data?.message || error.message}`,
        );
      }
    } else if (error.request) {
      throw new Error(
        'Network error. Could not connect to your WooCommerce store.',
      );
    } else {
      throw error;
    }
  }
};

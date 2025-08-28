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
  if (!url || !consumerKey || !consumerSecret) {
    throw new Error(
      'Missing required WooCommerce credentials. Please check your store URL, consumer key, and consumer secret.',
    );
  }

  // Extract inputs
  const { shippingClassId, outputVariable } = inputs;

  // Validate inputs
  if (!shippingClassId) {
    throw new Error('Shipping Class ID is required');
  }

  log(`Connecting to WooCommerce store at ${url}`);

  // Initialize WooCommerce API client
  const api = new WooCommerceRestApi({
    url: url,
    consumerKey: consumerKey,
    consumerSecret: consumerSecret,
    version: 'wc/v3',
  });

  try {
    log(`Retrieving shipping class with ID: ${shippingClassId}`);

    // Make API request to get shipping class
    const response = await api.get(
      `products/shipping_classes/${shippingClassId}`,
    );

    // Check if response contains data
    if (response && response.data) {
      log(`Successfully retrieved shipping class: ${response.data.name}`);

      // Set output variable with shipping class data
      setOutput(outputVariable, response.data);
    } else {
      throw new Error('No data returned from WooCommerce API');
    }
  } catch (error: any) {
    // Handle API errors
    if (error.response) {
      // The request was made and the server responded with a status code outside the 2xx range
      const statusCode = error.response.status;
      const errorMessage = error.response.data?.message || 'Unknown error';

      if (statusCode === 404) {
        throw new Error(`Shipping class with ID ${shippingClassId} not found`);
      } else {
        throw new Error(
          `WooCommerce API error (${statusCode}): ${errorMessage}`,
        );
      }
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error(
        'No response received from WooCommerce. Please check your store URL and internet connection.',
      );
    } else {
      // Something happened in setting up the request
      throw new Error(`Error connecting to WooCommerce: ${error.message}`);
    }
  }
};

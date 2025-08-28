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

  // Validate required environment variables
  if (!url) {
    throw new Error(
      'Missing WooCommerce Store URL. Please check your connection settings.',
    );
  }
  if (!consumerKey) {
    throw new Error(
      'Missing WooCommerce Consumer Key. Please check your connection settings.',
    );
  }
  if (!consumerSecret) {
    throw new Error(
      'Missing WooCommerce Consumer Secret. Please check your connection settings.',
    );
  }

  // Extract input variables
  const { outputVariable } = inputs;

  // Initialize WooCommerce API client
  const api = new WooCommerceRestApi({
    url: url,
    consumerKey: consumerKey,
    consumerSecret: consumerSecret,
    version: 'wc/v3',
  });

  try {
    log('Retrieving shipping zones from your WooCommerce store...');

    // Make API request to get shipping zones
    const response = await api.get('shipping/zones');

    // Check if response data exists and is an array
    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Invalid response from WooCommerce API');
    }

    log(`Successfully retrieved ${response.data.length} shipping zones`);

    // Set the output variable with the shipping zones data
    setOutput(outputVariable, response.data);
  } catch (error) {
    // Handle errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(
        `WooCommerce API error: ${error.response.status} - ${JSON.stringify(error.response.data)}`,
      );
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error(
        'No response received from WooCommerce API. Please check your store URL and internet connection.',
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      throw error;
    }
  }
};

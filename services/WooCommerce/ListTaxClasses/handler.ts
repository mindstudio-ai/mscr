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

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing WooCommerce API credentials. Please check your connection settings.',
    );
  }

  // Extract output variable name from inputs
  const { outputVariable } = inputs;

  // Initialize WooCommerce API client
  const api = new WooCommerceRestApi({
    url: url,
    consumerKey: consumerKey,
    consumerSecret: consumerSecret,
    version: 'wc/v3',
  });

  log('Connecting to WooCommerce store...');

  try {
    // Make the API request to get tax classes
    log('Retrieving tax classes...');
    const response = await api.get('taxes/classes');

    // Check if the response contains data
    if (response && response.data) {
      const taxClasses = response.data;
      log(`Successfully retrieved ${taxClasses.length} tax classes`);

      // Set the output variable with the tax classes data
      setOutput(outputVariable, taxClasses);
    } else {
      throw new Error('Received empty response from WooCommerce API');
    }
  } catch (error) {
    // Handle API errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const statusCode = error.response.status;
      const errorMessage = error.response.data?.message || 'Unknown API error';

      throw new Error(`WooCommerce API error (${statusCode}): ${errorMessage}`);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error(
        'No response received from WooCommerce. Please check your store URL and internet connection.',
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      throw error;
    }
  }
};

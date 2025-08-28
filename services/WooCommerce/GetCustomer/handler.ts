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
      'Missing Store URL. Please configure your WooCommerce store URL in the connector settings.',
    );
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing API credentials. Please configure your WooCommerce API Consumer Key and Secret in the connector settings.',
    );
  }

  // Extract inputs
  const { customerId, outputVariable } = inputs;

  if (!customerId) {
    throw new Error('Customer ID is required');
  }

  // Initialize WooCommerce API client
  const api = new WooCommerceRestApi({
    url: url,
    consumerKey: consumerKey,
    consumerSecret: consumerSecret,
    version: 'wc/v3',
  });

  try {
    log(`Retrieving customer with ID: ${customerId}`);

    // Make the API request to get the customer
    const response = await api.get(`customers/${customerId}`);

    // Check if the request was successful
    if (response.status !== 200) {
      throw new Error(`Failed to retrieve customer: ${response.statusText}`);
    }

    log(
      `Successfully retrieved customer: ${response.data.first_name} ${response.data.last_name}`,
    );

    // Set the output variable with the customer data
    setOutput(outputVariable, response.data);
  } catch (error) {
    // Handle errors from the API
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const status = error.response.status;
      const message = error.response.data?.message || error.response.statusText;

      if (status === 404) {
        throw new Error(`Customer with ID ${customerId} not found`);
      } else {
        throw new Error(`API Error (${status}): ${message}`);
      }
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

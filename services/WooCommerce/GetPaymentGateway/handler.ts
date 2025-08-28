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
  const { gatewayId, outputVariable } = inputs;

  // Extract environment variables
  const { url, consumerKey, consumerSecret } = process.env;

  // Validate required environment variables
  if (!url) {
    throw new Error('Missing Store URL in environment variables');
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing WooCommerce API credentials in environment variables',
    );
  }

  // Validate required inputs
  if (!gatewayId) {
    throw new Error('Gateway ID is required');
  }

  // Initialize WooCommerce API client
  const api = new WooCommerceRestApi({
    url: url,
    consumerKey: consumerKey,
    consumerSecret: consumerSecret,
    version: 'wc/v3',
  });

  try {
    // Log the action being performed
    log(`Retrieving details for payment gateway: ${gatewayId}`);

    // Make the API request to get payment gateway details
    const response = await api.get(`payment_gateways/${gatewayId}`);

    // Check if the response was successful
    if (response.status !== 200) {
      throw new Error(
        `Failed to retrieve payment gateway: ${response.statusText}`,
      );
    }

    // Log success
    log(
      `Successfully retrieved details for payment gateway: ${response.data.title || gatewayId}`,
    );

    // Set the output variable with the payment gateway details
    setOutput(outputVariable, response.data);
  } catch (error) {
    // Handle errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const status = error.response.status;
      const message = error.response.data?.message || error.response.statusText;

      if (status === 404) {
        throw new Error(`Payment gateway '${gatewayId}' not found`);
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

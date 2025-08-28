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
      'Missing WooCommerce credentials. Please check your store URL, consumer key, and consumer secret.',
    );
  }

  // Extract inputs
  const { orderId, refundId, decimalPoints, outputVariable } = inputs;

  // Validate required inputs
  if (!orderId) {
    throw new Error('Order ID is required');
  }

  if (!refundId) {
    throw new Error('Refund ID is required');
  }

  log(`Retrieving refund #${refundId} for order #${orderId}...`);

  try {
    // Initialize WooCommerce API client
    const api = new WooCommerceRestApi({
      url,
      consumerKey,
      consumerSecret,
      version: 'wc/v3',
      queryStringAuth: true, // Force Basic Authentication as query string for some servers
    });

    // Prepare query parameters
    const params: Record<string, string> = {};
    if (decimalPoints) {
      params.dp = decimalPoints;
    }

    // Make API request
    const response = await api.get(
      `orders/${orderId}/refunds/${refundId}`,
      params,
    );

    log(`Successfully retrieved refund information`);

    // Set output variable with the refund data
    setOutput(outputVariable, response.data);
  } catch (error: any) {
    // Handle different error scenarios
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const status = error.response.status;
      const message = error.response.data?.message || 'Unknown error';

      if (status === 401 || status === 403) {
        throw new Error(
          `Authentication error: Please check your WooCommerce API credentials (${message})`,
        );
      } else if (status === 404) {
        throw new Error(
          `Refund not found: The specified refund #${refundId} for order #${orderId} could not be found (${message})`,
        );
      } else {
        throw new Error(`WooCommerce API error (${status}): ${message}`);
      }
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error(
        `Network error: Could not connect to your WooCommerce store. Please check your store URL and internet connection.`,
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(`Error: ${error.message}`);
    }
  }
};

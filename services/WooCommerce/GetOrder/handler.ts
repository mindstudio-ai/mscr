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
      'Missing WooCommerce credentials. Please check your connection settings.',
    );
  }

  // Extract inputs
  const { orderId, decimalPoints, outputVariable } = inputs;

  // Validate required inputs
  if (!orderId) {
    throw new Error('Order ID is required');
  }

  log(`Retrieving order #${orderId} from WooCommerce...`);

  try {
    // Initialize WooCommerce API client
    const api = new WooCommerceRestApi({
      url: url,
      consumerKey: consumerKey,
      consumerSecret: consumerSecret,
      version: 'wc/v3',
    });

    // Prepare query parameters
    const queryParams: Record<string, string> = {};
    if (decimalPoints) {
      queryParams.dp = decimalPoints;
    }

    // Make API request to get order
    const response = await api.get(`orders/${orderId}`, queryParams);

    // Check if order was found
    if (!response || !response.data) {
      throw new Error(`Order #${orderId} not found`);
    }

    log(`Successfully retrieved order #${orderId}`);

    // Set output variable with order data
    setOutput(outputVariable, response.data);
  } catch (error) {
    // Handle errors
    if (error.response && error.response.status === 404) {
      throw new Error(`Order #${orderId} not found`);
    } else if (
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      throw new Error(`WooCommerce API error: ${error.response.data.message}`);
    } else {
      throw new Error(`Error retrieving order: ${error.message}`);
    }
  }
};

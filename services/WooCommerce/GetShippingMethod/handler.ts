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
  const { zoneId, methodId, outputVariable } = inputs;

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

  // Initialize WooCommerce API client
  const api = new WooCommerceRestApi({
    url: url,
    consumerKey: consumerKey,
    consumerSecret: consumerSecret,
    version: 'wc/v3',
  });

  log(`Retrieving shipping method ${methodId} from zone ${zoneId}...`);

  try {
    // Make API request to get the shipping method
    const response = await api.get(
      `shipping/zones/${zoneId}/methods/${methodId}`,
    );

    // Check if we got a valid response
    if (response && response.data) {
      log(`Successfully retrieved shipping method: ${response.data.title}`);

      // Set the output variable with the shipping method data
      setOutput(outputVariable, response.data);
    } else {
      throw new Error('Received empty response from WooCommerce API');
    }
  } catch (error) {
    // Handle common API errors
    if (error.response) {
      const { status, data } = error.response;

      if (status === 401 || status === 403) {
        throw new Error(
          'Authentication failed. Please check your WooCommerce API credentials.',
        );
      } else if (status === 404) {
        throw new Error(
          `Shipping method not found. Please verify the Zone ID (${zoneId}) and Method ID (${methodId}).`,
        );
      } else {
        throw new Error(
          `WooCommerce API Error (${status}): ${data?.message || 'Unknown error'}`,
        );
      }
    } else {
      // For network errors or other unexpected issues
      throw new Error(`Error retrieving shipping method: ${error.message}`);
    }
  }
};

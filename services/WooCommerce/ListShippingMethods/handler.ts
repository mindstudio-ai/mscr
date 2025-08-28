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
  const { zoneId, outputVariable } = inputs;

  // Extract environment variables
  const { url, consumerKey, consumerSecret } = process.env;

  // Validate required environment variables
  if (!url) {
    throw new Error(
      'Missing Store URL. Please configure the WooCommerce Store URL in the connector settings.',
    );
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing API credentials. Please configure the WooCommerce API Consumer Key and Secret in the connector settings.',
    );
  }

  // Validate required inputs
  if (!zoneId) {
    throw new Error(
      'Missing Zone ID. Please provide a valid shipping zone ID.',
    );
  }

  // Initialize WooCommerce API client
  const api = new WooCommerceRestApi({
    url,
    consumerKey,
    consumerSecret,
    version: 'wc/v3',
    queryStringAuth: true, // Force Basic Authentication as query string for some servers
  });

  try {
    log(`Retrieving shipping methods for zone ID: ${zoneId}...`);

    // Make API request to get shipping methods for the specified zone
    const response = await api.get(`shipping/zones/${zoneId}/methods`);

    // Check if we got a successful response
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }

    const shippingMethods = response.data;

    log(
      `Successfully retrieved ${shippingMethods.length} shipping method(s) from zone ${zoneId}`,
    );

    // Set the output variable with the shipping methods data
    setOutput(outputVariable, shippingMethods);
  } catch (error) {
    // Handle specific error cases
    if (error.response) {
      const { status, data } = error.response;

      if (status === 401 || status === 403) {
        throw new Error(
          'Authentication failed. Please check your WooCommerce API credentials.',
        );
      } else if (status === 404) {
        throw new Error(
          `Shipping zone with ID ${zoneId} not found. Please verify the zone ID.`,
        );
      } else {
        throw new Error(
          `WooCommerce API error (${status}): ${data?.message || 'Unknown error'}`,
        );
      }
    }

    // Re-throw the original error if it wasn't handled above
    throw error;
  }
};

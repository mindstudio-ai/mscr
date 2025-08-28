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
  if (!url || !consumerKey || !consumerSecret) {
    throw new Error(
      'Missing required WooCommerce credentials. Please check your Store URL, Consumer Key, and Consumer Secret.',
    );
  }

  // Validate required inputs
  if (!zoneId) {
    throw new Error('Zone ID is required');
  }

  if (!methodId) {
    throw new Error('Method ID is required');
  }

  // Initialize WooCommerce API client
  const api = new WooCommerceRestApi({
    url: url,
    consumerKey: consumerKey,
    consumerSecret: consumerSecret,
    version: 'wc/v3',
  });

  try {
    log(`Deleting shipping method ${methodId} from zone ${zoneId}...`);

    // Make DELETE request to WooCommerce API
    const response = await api.delete(
      `shipping/zones/${zoneId}/methods/${methodId}`,
      { force: true },
    );

    // Extract the deleted shipping method data
    const deletedMethod = response.data;

    log(
      `Successfully deleted shipping method "${deletedMethod.method_title}" (ID: ${deletedMethod.instance_id})`,
    );

    // Set the output variable with the deleted shipping method data
    setOutput(outputVariable, deletedMethod);
  } catch (error) {
    // Handle API errors
    if (error.response) {
      const { status, data } = error.response;

      if (status === 404) {
        throw new Error(
          `Shipping method not found. Please verify the Zone ID and Method ID are correct.`,
        );
      } else if (status === 401) {
        throw new Error(
          `Authentication failed. Please check your WooCommerce API credentials.`,
        );
      } else {
        const message = data?.message || 'Unknown error occurred';
        throw new Error(`WooCommerce API error (${status}): ${message}`);
      }
    } else {
      throw new Error(`Error connecting to WooCommerce: ${error.message}`);
    }
  }
};

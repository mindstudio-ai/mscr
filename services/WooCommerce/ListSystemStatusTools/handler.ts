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
      'Missing Store URL. Please configure the WooCommerce Store URL in the connector settings.',
    );
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing API credentials. Please configure the WooCommerce API Consumer Key and Secret in the connector settings.',
    );
  }

  // Extract inputs
  const { outputVariable } = inputs;

  log('Connecting to WooCommerce API...');

  // Initialize WooCommerce API client
  const api = new WooCommerceRestApi({
    url: url,
    consumerKey: consumerKey,
    consumerSecret: consumerSecret,
    version: 'wc/v3',
  });

  try {
    log('Fetching system status tools...');

    // Make API request to get system status tools
    const response = await api.get('system_status/tools');

    // Check if the response contains data
    if (!response || !response.data) {
      throw new Error('No data received from WooCommerce API');
    }

    log(`Successfully retrieved ${response.data.length} system status tools`);

    // Set the output variable with the list of tools
    setOutput(outputVariable, response.data);
  } catch (error) {
    // Handle errors from the API
    if (error.response) {
      throw new Error(
        `WooCommerce API error: ${error.response.data?.message || error.response.statusText || error.message}`,
      );
    } else {
      throw new Error(`Error connecting to WooCommerce: ${error.message}`);
    }
  }
};

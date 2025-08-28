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
  const { toolId, outputVariable } = inputs;

  // Extract environment variables
  const { url, consumerKey, consumerSecret } = process.env;

  // Validate required environment variables
  if (!url) {
    throw new Error(
      'Missing store URL. Please configure your WooCommerce store URL in the connector settings.',
    );
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing API credentials. Please configure your WooCommerce API Consumer Key and Secret in the connector settings.',
    );
  }

  // Validate required inputs
  if (!toolId) {
    throw new Error('Tool ID is required. Please provide a valid tool ID.');
  }

  log(`Retrieving system status tool information for: ${toolId}`);

  try {
    // Initialize WooCommerce API client
    const api = new WooCommerceRestApi({
      url: url,
      consumerKey: consumerKey,
      consumerSecret: consumerSecret,
      version: 'wc/v3',
    });

    // Make the API request
    const response = await api.get(`system_status/tools/${toolId}`);

    // Check if the request was successful
    if (response.status !== 200) {
      throw new Error(
        `Failed to retrieve tool information. Status: ${response.status}`,
      );
    }

    log(`Successfully retrieved information for tool: ${response.data.name}`);

    // Set the output variable with the tool information
    setOutput(outputVariable, response.data);
  } catch (error) {
    // Handle errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 404) {
        throw new Error(
          `Tool with ID '${toolId}' not found. Please verify the tool ID is correct.`,
        );
      } else {
        throw new Error(
          `API error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`,
        );
      }
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error(
        'No response received from WooCommerce. Please check your store URL and internet connection.',
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(`Error: ${error.message}`);
    }
  }
};

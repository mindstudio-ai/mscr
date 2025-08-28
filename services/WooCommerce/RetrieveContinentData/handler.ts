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
  const { continentCode, outputVariable } = inputs;

  // Extract environment variables
  const { url, consumerKey, consumerSecret } = process.env;

  // Validate required environment variables
  if (!url) {
    throw new Error('Missing Store URL in environment variables');
  }

  if (!consumerKey) {
    throw new Error('Missing Consumer Key in environment variables');
  }

  if (!consumerSecret) {
    throw new Error('Missing Consumer Secret in environment variables');
  }

  // Initialize WooCommerce API client
  const api = new WooCommerceRestApi({
    url,
    consumerKey,
    consumerSecret,
    version: 'wc/v3',
  });

  try {
    log(`Retrieving data for continent: ${continentCode.toUpperCase()}`);

    // Make the API request
    const response = await api.get(`data/continents/${continentCode}`);

    log(`Successfully retrieved data for ${response.data.name}`);

    // Set the output variable with the continent data
    setOutput(outputVariable, response.data);
  } catch (error) {
    // Handle API errors
    if (error.response) {
      const { status, data } = error.response;
      log(`API Error (${status}): ${data.message || 'Unknown error'}`);
      throw new Error(
        `WooCommerce API Error: ${data.message || 'Unknown error'}`,
      );
    } else {
      // Handle connection errors
      log(`Connection error: ${error.message}`);
      throw new Error(`WooCommerce connection error: ${error.message}`);
    }
  }
};

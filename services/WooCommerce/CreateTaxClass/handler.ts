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
  const { name, outputVariable } = inputs;

  // Extract environment variables
  const { url, consumerKey, consumerSecret } = process.env;

  // Validate required environment variables
  if (!url) {
    throw new Error(
      'Store URL is required. Please check your WooCommerce connection settings.',
    );
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'WooCommerce API credentials are required. Please check your WooCommerce connection settings.',
    );
  }

  // Initialize WooCommerce API client
  const api = new WooCommerceRestApi({
    url: url,
    consumerKey: consumerKey,
    consumerSecret: consumerSecret,
    version: 'wc/v3',
  });

  log(`Creating new tax class: "${name}"`);

  try {
    // Make the API request to create a tax class
    const response = await api.post('taxes/classes', {
      name,
    });

    // Check if the response is successful
    if (response.status !== 201 && response.status !== 200) {
      throw new Error(`Failed to create tax class. Status: ${response.status}`);
    }

    const taxClass = response.data;
    log(
      `Successfully created tax class "${name}" with slug "${taxClass.slug}"`,
    );

    // Set the output variable with the created tax class data
    setOutput(outputVariable, taxClass);
  } catch (error) {
    // Handle API errors
    if (error.response) {
      const { status, data } = error.response;

      if (status === 401) {
        throw new Error(
          'Authentication failed. Please check your WooCommerce API credentials.',
        );
      } else if (status === 400) {
        throw new Error(
          `Invalid request: ${data.message || 'Please check your tax class details'}`,
        );
      } else {
        throw new Error(
          `WooCommerce API error (${status}): ${data.message || 'Unknown error'}`,
        );
      }
    } else {
      // Handle network or other errors
      throw new Error(`Failed to connect to WooCommerce: ${error.message}`);
    }
  }
};

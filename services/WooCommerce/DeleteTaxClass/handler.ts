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
  const { slug, confirmDeletion, outputVariable } = inputs;

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
      'WooCommerce API credentials are required. Please check your connection settings.',
    );
  }

  // Validate slug
  if (!slug) {
    throw new Error('Tax class slug is required.');
  }

  // Check confirmation
  if (confirmDeletion !== 'yes') {
    throw new Error(
      'Deletion not confirmed. Please confirm deletion to proceed.',
    );
  }

  // Initialize WooCommerce API client
  const api = new WooCommerceRestApi({
    url: url,
    consumerKey: consumerKey,
    consumerSecret: consumerSecret,
    version: 'wc/v3',
  });

  try {
    log(`Deleting tax class with slug: ${slug}`);

    // Make the DELETE request to WooCommerce API
    // The force=true parameter is required as this resource doesn't support trashing
    const response = await api.delete(`taxes/classes/${slug}`, {
      force: true,
    });

    log(`Successfully deleted tax class: ${response.data.name}`);

    // Set the output variable with the response data
    setOutput(outputVariable, response.data);
  } catch (error: any) {
    // Handle errors from the WooCommerce API
    if (error.response) {
      const { status, data } = error.response;
      const message = data?.message || 'Unknown error occurred';

      log(`Error deleting tax class (${status}): ${message}`);
      throw new Error(`Failed to delete tax class: ${message}`);
    } else {
      log(`Error connecting to WooCommerce: ${error.message}`);
      throw new Error(`Connection error: ${error.message}`);
    }
  }
};

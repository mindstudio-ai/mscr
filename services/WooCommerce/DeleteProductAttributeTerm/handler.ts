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
  const { attributeId, termId, outputVariable } = inputs;

  // Extract environment variables
  const { url, consumerKey, consumerSecret } = process.env;

  // Validate required environment variables
  if (!url || !consumerKey || !consumerSecret) {
    throw new Error(
      'Missing required WooCommerce credentials. Please check your configuration.',
    );
  }

  // Validate required inputs
  if (!attributeId) {
    throw new Error('Attribute ID is required');
  }

  if (!termId) {
    throw new Error('Term ID is required');
  }

  // Initialize WooCommerce API client
  const api = new WooCommerceRestApi({
    url: url,
    consumerKey: consumerKey,
    consumerSecret: consumerSecret,
    version: 'wc/v3',
  });

  try {
    log(
      `Deleting product attribute term with ID ${termId} from attribute ${attributeId}...`,
    );

    // Make the API request to delete the term
    // Note: force=true is required as this resource doesn't support trashing
    const response = await api.delete(
      `products/attributes/${attributeId}/terms/${termId}`,
      {
        force: true,
      },
    );

    // Set the output variable with the deleted term data
    setOutput(outputVariable, response.data);

    log(`Successfully deleted product attribute term with ID ${termId}`);
  } catch (error) {
    // Handle API errors
    if (error.response) {
      const { status, data } = error.response;

      if (status === 404) {
        throw new Error(
          `Term or attribute not found. Please check that attribute ID ${attributeId} and term ID ${termId} exist.`,
        );
      } else {
        throw new Error(
          `WooCommerce API error (${status}): ${data?.message || 'Unknown error'}`,
        );
      }
    } else {
      // Handle network or other errors
      throw new Error(`Error connecting to WooCommerce: ${error.message}`);
    }
  }
};

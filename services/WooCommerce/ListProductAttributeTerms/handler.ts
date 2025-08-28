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
      'Missing required WooCommerce credentials. Please check your store URL, consumer key, and consumer secret.',
    );
  }

  // Extract inputs
  const {
    attributeId,
    perPage = '10',
    page = '1',
    search,
    order = 'asc',
    orderBy = 'name',
    hideEmpty = 'false',
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!attributeId) {
    throw new Error('Attribute ID is required');
  }

  // Initialize WooCommerce API client
  const api = new WooCommerceRestApi({
    url: url,
    consumerKey: consumerKey,
    consumerSecret: consumerSecret,
    version: 'wc/v3',
  });

  // Prepare query parameters
  const queryParams: Record<string, any> = {
    per_page: parseInt(perPage, 10),
    page: parseInt(page, 10),
    order,
    orderby: orderBy,
    hide_empty: hideEmpty === 'true',
  };

  // Add optional parameters if provided
  if (search) {
    queryParams.search = search;
  }

  try {
    log(`Fetching attribute terms for attribute ID: ${attributeId}`);

    // Make the API request
    const response = await api.get(
      `products/attributes/${attributeId}/terms`,
      queryParams,
    );

    const terms = response.data;

    log(`Successfully retrieved ${terms.length} attribute terms`);

    // Set the output variable with the retrieved terms
    setOutput(outputVariable, terms);
  } catch (error: any) {
    // Handle specific error cases
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      if (status === 401 || status === 403) {
        throw new Error(
          'Authentication failed. Please check your WooCommerce API credentials.',
        );
      } else if (status === 404) {
        throw new Error(
          `Attribute with ID ${attributeId} not found. Please verify the attribute ID.`,
        );
      } else if (status === 429) {
        throw new Error('API rate limit exceeded. Please try again later.');
      } else {
        throw new Error(
          `WooCommerce API error (${status}): ${data?.message || 'Unknown error'}`,
        );
      }
    } else if (error.request) {
      throw new Error(
        'No response received from WooCommerce. Please check your store URL and internet connection.',
      );
    } else {
      throw new Error(`Error: ${error.message || 'Unknown error occurred'}`);
    }
  }
};

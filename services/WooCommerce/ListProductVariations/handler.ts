export const handler = async ({
  inputs,
  setOutput,
  log,
  uploadFile,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  // Extract environment variables
  const { url, consumerKey, consumerSecret } = process.env;

  // Validate environment variables
  if (!url) {
    throw new Error(
      'Missing Store URL. Please configure your WooCommerce store URL in the connector settings.',
    );
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing API credentials. Please configure your WooCommerce API Consumer Key and Secret in the connector settings.',
    );
  }

  // Extract required inputs
  const { productId, outputVariable } = inputs;

  if (!productId) {
    throw new Error('Product ID is required');
  }

  // Extract optional filtering parameters
  const {
    perPage = '10',
    page = '1',
    search,
    order,
    orderby,
    sku,
    stockStatus,
  } = inputs;

  // Construct the base URL, ensuring no trailing slash
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;

  // Build the API endpoint
  let apiUrl = `${baseUrl}/wp-json/wc/v3/products/${productId}/variations`;

  // Build query parameters
  const queryParams = new URLSearchParams();

  if (perPage) {
    queryParams.append('per_page', perPage);
  }
  if (page) {
    queryParams.append('page', page);
  }
  if (search) {
    queryParams.append('search', search);
  }
  if (order) {
    queryParams.append('order', order);
  }
  if (orderby) {
    queryParams.append('orderby', orderby);
  }
  if (sku) {
    queryParams.append('sku', sku);
  }
  if (stockStatus) {
    queryParams.append('stock_status', stockStatus);
  }

  // Append query parameters to URL if any exist
  const queryString = queryParams.toString();
  if (queryString) {
    apiUrl += `?${queryString}`;
  }

  log(`Retrieving variations for product ID: ${productId}`);

  try {
    // Create Basic Auth credentials
    const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      'base64',
    );

    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // Handle API errors
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `WooCommerce API error (${response.status}): ${errorText}`,
      );
    }

    // Parse the response
    const variations = await response.json();

    if (!Array.isArray(variations)) {
      throw new Error(
        'Unexpected response format. Expected an array of variations.',
      );
    }

    log(`Retrieved ${variations.length} product variations`);

    // Set the output variable
    setOutput(outputVariable, variations);
  } catch (error) {
    // Handle any errors that occurred during the request
    if (error instanceof Error) {
      throw new Error(
        `Failed to retrieve product variations: ${error.message}`,
      );
    } else {
      throw new Error(`Failed to retrieve product variations: Unknown error`);
    }
  }
};

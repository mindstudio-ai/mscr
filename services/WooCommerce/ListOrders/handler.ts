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

  // Extract inputs
  const {
    status,
    customer,
    product,
    after,
    before,
    page = '1',
    perPage = '10',
    order = 'desc',
    orderby = 'date',
    outputVariable,
  } = inputs;

  // Build query parameters
  const queryParams = new URLSearchParams();

  // Add filtering parameters if provided
  if (status) {
    queryParams.append('status', status);
  }
  if (customer) {
    queryParams.append('customer', customer);
  }
  if (product) {
    queryParams.append('product', product);
  }
  if (after) {
    queryParams.append('after', after);
  }
  if (before) {
    queryParams.append('before', before);
  }

  // Add pagination parameters
  queryParams.append('page', page);
  queryParams.append('per_page', perPage);
  queryParams.append('order', order);
  queryParams.append('orderby', orderby);

  // Build the API endpoint URL
  const apiUrl = `${url.replace(/\/$/, '')}/wp-json/wc/v3/orders?${queryParams.toString()}`;

  log('Fetching orders from WooCommerce...');

  try {
    // Create Authorization header using Basic Auth
    const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      'base64',
    );

    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/json',
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `WooCommerce API error (${response.status}): ${errorText}`,
      );
    }

    // Parse the response
    const orders = await response.json();

    if (!Array.isArray(orders)) {
      throw new Error('Unexpected response format from WooCommerce API');
    }

    log(`Successfully retrieved ${orders.length} orders`);

    // Set the output variable with the orders
    setOutput(outputVariable, orders);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      log(`Error fetching orders: ${error.message}`);
      throw error;
    }
    throw new Error('Unknown error occurred while fetching orders');
  }
};

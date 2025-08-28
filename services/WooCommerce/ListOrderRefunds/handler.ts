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
  if (!url || !consumerKey || !consumerSecret) {
    throw new Error(
      'Missing required WooCommerce credentials. Please check your store URL, consumer key, and consumer secret.',
    );
  }

  // Extract inputs
  const {
    orderId,
    page,
    perPage,
    search,
    after,
    before,
    order,
    orderby,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!orderId) {
    throw new Error('Order ID is required');
  }

  if (!outputVariable) {
    throw new Error('Output variable name is required');
  }

  log(`Fetching refunds for order #${orderId}...`);

  // Build query parameters
  const queryParams = new URLSearchParams();

  // Add pagination parameters if provided
  if (page) {
    queryParams.append('page', page);
  }
  if (perPage) {
    queryParams.append('per_page', perPage);
  }

  // Add filtering parameters if provided
  if (search) {
    queryParams.append('search', search);
  }
  if (after) {
    queryParams.append('after', after);
  }
  if (before) {
    queryParams.append('before', before);
  }
  if (order) {
    queryParams.append('order', order);
  }
  if (orderby) {
    queryParams.append('orderby', orderby);
  }

  // Create API endpoint URL
  const apiUrl = `${url}/wp-json/wc/v3/orders/${orderId}/refunds?${queryParams.toString()}`;

  try {
    // Make the API request with Basic Auth
    const credentials = Buffer.from(
      `${consumerKey}:${consumerSecret}`,
    ).toString('base64');

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `WooCommerce API error (${response.status}): ${errorText}`,
      );
    }

    const refunds = await response.json();

    log(
      `Successfully retrieved ${refunds.length} refund(s) for order #${orderId}`,
    );

    // Set the output variable with the refunds data
    setOutput(outputVariable, refunds);
  } catch (error) {
    log(
      `Error fetching refunds: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};

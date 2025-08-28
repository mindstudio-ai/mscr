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
  // Get environment variables
  const { url, consumerKey, consumerSecret } = process.env;

  // Validate required environment variables
  if (!url) {
    throw new Error('Missing WooCommerce store URL in environment variables');
  }
  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing WooCommerce API credentials in environment variables',
    );
  }

  // Extract inputs
  const {
    perPage,
    page,
    order,
    orderby,
    search,
    after,
    before,
    parent,
    outputVariable,
  } = inputs;

  // Construct the API endpoint URL
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const endpoint = `${baseUrl}/wp-json/wc/v3/refunds`;

  // Build query parameters
  const params = new URLSearchParams();

  if (perPage) {
    params.append('per_page', perPage);
  }
  if (page) {
    params.append('page', page);
  }
  if (order) {
    params.append('order', order);
  }
  if (orderby) {
    params.append('orderby', orderby);
  }
  if (search) {
    params.append('search', search);
  }
  if (after) {
    params.append('after', after);
  }
  if (before) {
    params.append('before', before);
  }
  if (parent) {
    // Handle comma-separated list of parent order IDs
    const parentIds = parent.split(',').map((id) => id.trim());
    parentIds.forEach((id) => params.append('parent', id));
  }

  const requestUrl = `${endpoint}?${params.toString()}`;

  log(`Fetching refunds from WooCommerce store...`);

  try {
    // Create authorization header using Basic Auth
    const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      'base64',
    );

    // Make the API request
    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${authString}`,
      },
    });

    // Handle API response
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `WooCommerce API error (${response.status}): ${errorText}`,
      );
    }

    const refunds = await response.json();

    log(`Successfully retrieved ${refunds.length} refunds`);

    // Set the output variable with the refunds data
    setOutput(outputVariable, refunds);
  } catch (error) {
    // Handle errors
    log(
      `Error fetching refunds: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};

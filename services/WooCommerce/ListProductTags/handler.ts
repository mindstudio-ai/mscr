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
    throw new Error(
      'Store URL is required. Please check your WooCommerce configuration.',
    );
  }
  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'WooCommerce API credentials are required. Please check your configuration.',
    );
  }

  // Extract inputs
  const { page, perPage, search, order, orderby, hideEmpty, outputVariable } =
    inputs;

  // Validate required inputs
  if (!outputVariable) {
    throw new Error('Output variable name is required.');
  }

  // Construct the API endpoint
  let apiUrl = `${url.replace(/\/$/, '')}/wp-json/wc/v3/products/tags`;

  // Build query parameters
  const queryParams = new URLSearchParams();

  if (page) {
    queryParams.append('page', page);
  }
  if (perPage) {
    queryParams.append('per_page', perPage);
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
  if (hideEmpty) {
    queryParams.append('hide_empty', hideEmpty);
  }

  // Add query parameters to URL if any exist
  const queryString = queryParams.toString();
  if (queryString) {
    apiUrl += `?${queryString}`;
  }

  log(`Fetching product tags from your WooCommerce store...`);

  try {
    // Create authorization header for Basic Auth
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

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `WooCommerce API error (${response.status}): ${errorText}`,
      );
    }

    // Parse the response
    const productTags = await response.json();

    // Log success message with count
    log(`Successfully retrieved ${productTags.length} product tags.`);

    // Set the output variable with the product tags
    setOutput(outputVariable, productTags);
  } catch (error) {
    // Handle any errors
    log(
      `Error fetching product tags: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};

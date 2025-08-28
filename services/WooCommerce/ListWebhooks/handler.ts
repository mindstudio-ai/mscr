import fetch from 'node-fetch';

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
  if (!url) {
    throw new Error(
      'Store URL is required. Please check your WooCommerce connection settings.',
    );
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'WooCommerce API credentials are missing. Please check your connection settings.',
    );
  }

  // Extract input parameters
  const {
    status = 'all',
    page = '1',
    perPage = '10',
    search,
    orderby = 'date',
    order = 'desc',
    outputVariable,
  } = inputs;

  // Build query parameters
  const queryParams = new URLSearchParams();
  queryParams.append('status', status);
  queryParams.append('page', page.toString());
  queryParams.append('per_page', perPage.toString());

  if (search) {
    queryParams.append('search', search);
  }

  queryParams.append('orderby', orderby);
  queryParams.append('order', order);

  // Construct the API URL
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const apiUrl = `${baseUrl}/wp-json/wc/v3/webhooks?${queryParams.toString()}`;

  // Create authorization header for Basic Auth
  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  log(`Retrieving webhooks from your WooCommerce store...`);

  try {
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
    const webhooks = await response.json();

    // Get pagination information from headers
    const totalItems = response.headers.get('X-WP-Total');
    const totalPages = response.headers.get('X-WP-TotalPages');

    // Log success message with pagination info
    if (totalItems && totalPages) {
      log(
        `Successfully retrieved ${webhooks.length} webhooks (page ${page} of ${totalPages}, total: ${totalItems} webhooks)`,
      );
    } else {
      log(`Successfully retrieved ${webhooks.length} webhooks`);
    }

    // Set the output variable with the webhooks data
    setOutput(outputVariable, webhooks);
  } catch (error) {
    // Handle errors
    log(`Error retrieving webhooks: ${error.message}`);
    throw error;
  }
};

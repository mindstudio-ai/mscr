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

  // Validate required environment variables
  if (!url) {
    throw new Error(
      'Missing Store URL. Please configure your WooCommerce connection.',
    );
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing API credentials. Please configure your WooCommerce API keys.',
    );
  }

  // Extract inputs
  const {
    search,
    perPage,
    page,
    order,
    orderby,
    hideEmpty,
    parent,
    outputVariable,
  } = inputs;

  // Build query parameters
  const queryParams = new URLSearchParams();

  if (search) {
    queryParams.append('search', search);
  }
  if (perPage) {
    queryParams.append('per_page', perPage);
  }
  if (page) {
    queryParams.append('page', page);
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
  if (parent) {
    queryParams.append('parent', parent);
  }

  // Construct the API URL
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const apiUrl = `${baseUrl}/wp-json/wc/v3/products/categories?${queryParams.toString()}`;

  log(`Fetching product categories from your WooCommerce store...`);

  try {
    // Create authorization header for Basic Auth
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      'base64',
    );

    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${auth}`,
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
    const categories = await response.json();

    // Log the result
    if (Array.isArray(categories)) {
      log(`Successfully retrieved ${categories.length} product categories.`);
    } else {
      log(`Successfully retrieved product categories.`);
    }

    // Set the output variable
    setOutput(outputVariable, categories);
  } catch (error) {
    // Handle any errors
    log(
      `Error fetching product categories: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};

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
      'Missing WooCommerce Store URL. Please check your service configuration.',
    );
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing WooCommerce API credentials. Please check your service configuration.',
    );
  }

  // Extract inputs
  const {
    page = '1',
    perPage = '10',
    search,
    code,
    orderby = 'date',
    order = 'desc',
    outputVariable,
  } = inputs;

  // Build query parameters
  const queryParams = new URLSearchParams();
  queryParams.append('page', page);
  queryParams.append('per_page', perPage);

  // Add optional filters if provided
  if (search) {
    queryParams.append('search', search);
  }
  if (code) {
    queryParams.append('code', code);
  }
  if (orderby) {
    queryParams.append('orderby', orderby);
  }
  if (order) {
    queryParams.append('order', order);
  }

  // Normalize the base URL (remove trailing slash if present)
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;

  // Construct the full API URL
  const apiUrl = `${baseUrl}/wp-json/wc/v3/coupons?${queryParams.toString()}`;

  log(`Fetching coupons from your WooCommerce store...`);

  try {
    // Create the authorization string for Basic Auth
    const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      'base64',
    );

    // Make the request to the WooCommerce API
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
    const coupons = await response.json();

    // Log success message with count
    log(
      `Successfully retrieved ${Array.isArray(coupons) ? coupons.length : 0} coupons.`,
    );

    // Set the output variable
    setOutput(outputVariable, coupons);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      log(`Error fetching coupons: ${error.message}`);
      throw error;
    }
    throw new Error('Unknown error occurred while fetching coupons');
  }
};

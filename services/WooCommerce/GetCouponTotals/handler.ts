export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  // Extract environment variables
  const { url, consumerKey, consumerSecret } = process.env;

  // Validate required environment variables
  if (!url) {
    throw new Error(
      'Missing WooCommerce store URL. Please check your configuration.',
    );
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing WooCommerce API credentials. Please check your consumer key and secret.',
    );
  }

  // Extract input variables
  const { outputVariable } = inputs;

  // Construct the API endpoint URL
  const endpoint = `${url.replace(/\/$/, '')}/wp-json/wc/v3/reports/coupons/totals`;

  log('Retrieving coupon totals from your WooCommerce store...');

  try {
    // Create authorization header using Basic Auth
    const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      'base64',
    );

    // Make the API request
    const response = await fetch(endpoint, {
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
    const data = await response.json();

    // Validate the response data
    if (!Array.isArray(data)) {
      throw new Error(
        'Unexpected response format from WooCommerce API. Expected an array of coupon totals.',
      );
    }

    log(
      `Successfully retrieved coupon totals. Found ${data.length} coupon types.`,
    );

    // Set the output variable with the coupon totals data
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle any errors that occurred during the API request
    if (error instanceof Error) {
      log(`Error retrieving coupon totals: ${error.message}`);
      throw error;
    } else {
      log('An unknown error occurred while retrieving coupon totals');
      throw new Error('Failed to retrieve coupon totals from WooCommerce');
    }
  }
};

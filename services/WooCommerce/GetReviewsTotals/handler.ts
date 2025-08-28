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
      'Missing Store URL. Please configure your WooCommerce store URL in the connector settings.',
    );
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing API credentials. Please configure your WooCommerce Consumer Key and Consumer Secret in the connector settings.',
    );
  }

  // Extract output variable name from inputs
  const { outputVariable } = inputs;

  // Create the authorization header for Basic Auth
  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  // Normalize the base URL (remove trailing slash if present)
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;

  // Construct the full endpoint URL
  const endpoint = `${baseUrl}/wp-json/wc/v3/reports/reviews/totals`;

  log('Fetching review totals from your WooCommerce store...');

  try {
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
    const reviewTotals = await response.json();

    // Validate that the response is an array
    if (!Array.isArray(reviewTotals)) {
      throw new Error(
        'Unexpected response format from WooCommerce API. Expected an array of review totals.',
      );
    }

    log(
      `Successfully retrieved review totals. Found ratings data for ${reviewTotals.length} star categories.`,
    );

    // Set the output variable with the review totals data
    setOutput(outputVariable, reviewTotals);
  } catch (error) {
    // Handle any errors that occurred during the request
    if (error instanceof Error) {
      throw new Error(`Failed to retrieve review totals: ${error.message}`);
    } else {
      throw new Error(
        'An unknown error occurred while retrieving review totals',
      );
    }
  }
};

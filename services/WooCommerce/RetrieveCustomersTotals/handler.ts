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
      'Missing WooCommerce Store URL. Please configure your store URL in the connector settings.',
    );
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing WooCommerce API credentials. Please configure your Consumer Key and Consumer Secret in the connector settings.',
    );
  }

  const { outputVariable } = inputs;

  // Remove trailing slash from URL if present
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const endpoint = `${baseUrl}/wp-json/wc/v3/reports/customers/totals`;

  log('Retrieving customer totals from WooCommerce...');

  try {
    // Create Basic Auth credentials
    const credentials = Buffer.from(
      `${consumerKey}:${consumerSecret}`,
    ).toString('base64');

    // Make the API request
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${credentials}`,
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

    log(
      `Successfully retrieved customer totals. Found ${data.length} customer types.`,
    );

    // Set the output variable with the customer totals data
    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error(
      'An unknown error occurred while retrieving customer totals',
    );
  }
};

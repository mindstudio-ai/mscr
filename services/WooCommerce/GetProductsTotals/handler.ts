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
      "Missing WooCommerce Store URL. Please configure the 'url' environment variable.",
    );
  }
  if (!consumerKey) {
    throw new Error(
      "Missing WooCommerce Consumer Key. Please configure the 'consumerKey' environment variable.",
    );
  }
  if (!consumerSecret) {
    throw new Error(
      "Missing WooCommerce Consumer Secret. Please configure the 'consumerSecret' environment variable.",
    );
  }

  // Extract input variables
  const { outputVariable } = inputs;

  // Normalize the base URL (remove trailing slash if present)
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const endpoint = `${baseUrl}/wp-json/wc/v3/reports/products/totals`;

  // Create Basic Auth credentials
  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  log('Connecting to your WooCommerce store...');

  try {
    // Make the request to the WooCommerce API
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

    log(
      `Successfully retrieved product totals. Found ${data.length} product types.`,
    );

    // Set the output variable with the response data
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle any errors that occurred during the request
    if (error instanceof Error) {
      log(`Error retrieving product totals: ${error.message}`);
      throw error;
    }
    throw new Error('Unknown error occurred while retrieving product totals');
  }
};

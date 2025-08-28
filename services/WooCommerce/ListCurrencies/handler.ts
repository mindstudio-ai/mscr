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
      'Missing Store URL. Please configure the WooCommerce connection.',
    );
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing API credentials. Please configure your WooCommerce Consumer Key and Secret.',
    );
  }

  // Extract input variables
  const { outputVariable } = inputs;

  // Remove trailing slash from URL if present
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;

  // Construct the API endpoint
  const endpoint = `${baseUrl}/wp-json/wc/v3/data/currencies`;

  log('Connecting to WooCommerce store...');

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
    const currencies = await response.json();

    if (!Array.isArray(currencies)) {
      throw new Error(
        'Unexpected response format. Expected an array of currencies.',
      );
    }

    log(
      `Successfully retrieved ${currencies.length} currencies from WooCommerce.`,
    );

    // Set the output variable with the currencies data
    setOutput(outputVariable, currencies);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      if (
        error.message.includes('ENOTFOUND') ||
        error.message.includes('ETIMEDOUT')
      ) {
        throw new Error(
          `Could not connect to the WooCommerce store at ${url}. Please check the URL and make sure the store is accessible.`,
        );
      }
      throw error;
    }
    throw new Error(
      'An unexpected error occurred while connecting to WooCommerce.',
    );
  }
};

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
    throw new Error('Missing WooCommerce store URL');
  }

  if (!consumerKey) {
    throw new Error('Missing WooCommerce API consumer key');
  }

  if (!consumerSecret) {
    throw new Error('Missing WooCommerce API consumer secret');
  }

  // Extract input variables
  const { outputVariable } = inputs;

  // Construct the API endpoint URL
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const endpoint = `${baseUrl}/wp-json/wc/v3/data`;

  log('Fetching WooCommerce data endpoints...');

  try {
    // Create authorization header for Basic Auth
    const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      'base64',
    );

    // Make the API request
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${authString}`,
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
    const data = await response.json();

    log(`Successfully retrieved ${data.length} data endpoints`);

    // Set the output variable with the data
    setOutput(outputVariable, data);
  } catch (error) {
    log(
      `Error fetching WooCommerce data: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};

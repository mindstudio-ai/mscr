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

  // Validate environment variables
  if (!url) {
    throw new Error('WooCommerce Store URL is required');
  }
  if (!consumerKey || !consumerSecret) {
    throw new Error('WooCommerce API credentials are required');
  }

  // Extract inputs
  const { currencyCode, outputVariable } = inputs;

  // Validate inputs
  if (!currencyCode) {
    throw new Error('Currency code is required');
  }

  // Format the base URL (remove trailing slash if present)
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;

  // Create the API endpoint URL
  const endpoint = `/wp-json/wc/v3/data/currencies/${currencyCode.toLowerCase()}`;
  const apiUrl = `${baseUrl}${endpoint}`;

  // Create the authorization header for Basic Auth
  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  log(`Retrieving data for currency: ${currencyCode}`);

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
        `Failed to retrieve currency data: ${response.status} ${response.statusText}. ${errorText}`,
      );
    }

    // Parse the response
    const currencyData = await response.json();

    log(
      `Successfully retrieved data for ${currencyData.name} (${currencyData.code})`,
    );

    // Set the output variable
    setOutput(outputVariable, currencyData);
  } catch (error) {
    // Handle any errors
    log(`Error: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
};

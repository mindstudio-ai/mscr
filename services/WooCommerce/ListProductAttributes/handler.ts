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
      'Missing Store URL. Please configure your WooCommerce store URL in the connector settings.',
    );
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing API credentials. Please configure your WooCommerce Consumer Key and Consumer Secret in the connector settings.',
    );
  }

  // Extract inputs
  const { context, outputVariable } = inputs;

  // Build the API endpoint URL
  let apiUrl = `${url}/wp-json/wc/v3/products/attributes`;

  // Add query parameters if provided
  const queryParams = new URLSearchParams();
  if (context) {
    queryParams.append('context', context);
  }

  // Append query parameters to URL if any exist
  if (queryParams.toString()) {
    apiUrl += `?${queryParams.toString()}`;
  }

  log(`Fetching product attributes from your WooCommerce store...`);

  try {
    // Create authorization header using Basic Auth
    const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      'base64',
    );

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
        `API request failed with status ${response.status}: ${errorText}`,
      );
    }

    // Parse the response
    const attributes = await response.json();

    log(`Successfully retrieved ${attributes.length} product attributes.`);

    // Set the output variable with the list of product attributes
    setOutput(outputVariable, attributes);
  } catch (error) {
    // Handle any errors that occurred during the request
    log(`Error fetching product attributes: ${error.message}`);
    throw error;
  }
};

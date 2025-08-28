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
      'Store URL is required. Please check your WooCommerce service configuration.',
    );
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'API Consumer Key and Consumer Secret are required. Please check your WooCommerce service configuration.',
    );
  }

  // Extract input variables
  const { outputVariable } = inputs;

  // Normalize the base URL (remove trailing slash if present)
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;

  // Construct the API endpoint
  const endpoint = `${baseUrl}/wp-json/wc/v3/system_status`;

  log(`Fetching system status from ${baseUrl}...`);

  try {
    // Create Basic Auth credentials
    const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      'base64',
    );

    // Make the API request
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${authString}`,
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
    const data = await response.json();

    log('Successfully retrieved system status information');

    // Set the output variable with the system status data
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle any errors that occurred during the request
    if (error instanceof Error) {
      if (
        error.message.includes('ENOTFOUND') ||
        error.message.includes('ECONNREFUSED')
      ) {
        throw new Error(
          `Could not connect to WooCommerce store at ${baseUrl}. Please check your Store URL.`,
        );
      } else if (error.message.includes('401')) {
        throw new Error(
          'Authentication failed. Please check your API Consumer Key and Consumer Secret.',
        );
      } else {
        throw new Error(`Error fetching system status: ${error.message}`);
      }
    } else {
      throw new Error('An unknown error occurred while fetching system status');
    }
  }
};

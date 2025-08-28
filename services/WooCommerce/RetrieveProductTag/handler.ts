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
    throw new Error(
      'Missing store URL. Please configure your WooCommerce store URL in the connector settings.',
    );
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing API credentials. Please configure your WooCommerce API Consumer Key and Secret in the connector settings.',
    );
  }

  // Extract inputs
  const { tagId, outputVariable } = inputs;

  if (!tagId) {
    throw new Error('Tag ID is required');
  }

  // Remove trailing slash from URL if present
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;

  // Construct the API endpoint
  const endpoint = `${baseUrl}/wp-json/wc/v3/products/tags/${tagId}`;

  log(`Retrieving product tag with ID: ${tagId}`);

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

    // Handle response status
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your WooCommerce API credentials.',
        );
      } else if (response.status === 404) {
        throw new Error(`Product tag with ID ${tagId} not found.`);
      } else {
        const errorText = await response.text();
        throw new Error(
          `WooCommerce API error (${response.status}): ${errorText}`,
        );
      }
    }

    // Parse the response
    const tagData = await response.json();

    log(`Successfully retrieved product tag: ${tagData.name}`);

    // Set the output variable
    setOutput(outputVariable, tagData);
  } catch (error) {
    // Handle any errors that occurred during the request
    if (error instanceof Error) {
      throw new Error(`Failed to retrieve product tag: ${error.message}`);
    } else {
      throw new Error(
        'An unknown error occurred while retrieving the product tag',
      );
    }
  }
};
